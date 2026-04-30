// Shared Playwright helpers for testing xdy-pf2e-workbench.
// Pattern adapted from twodsix-foundryvtt tests, itself adapted from JiDW's foundryvtt-dice-so-nice-tests.

const FOUNDRY_URL = "http://localhost:30000";
const WORLD_TITLE = "xdy-pf2e-workbench-playwright-test";
const SYSTEM_ID = "pf2e";
const DEFAULT_BENIGN_CONSOLE_PATTERNS = [/\[object Object]/, /Failed to load resource/];

// Retry / timing constants.
const MAX_USER_SELECT_RETRIES = 8;
const MAX_JOIN_ATTEMPTS = 3;
const WAIT_MS_AFTER_WORLD_READY = 1000;
const WAIT_MS_AFTER_TOUR_DISMISS = 200;
const WAIT_MS_BEFORE_SHUTDOWN = 1000;

/**
 * Register before/after hooks that create and tear down a shared world page.
 * Returns a getter to avoid reading page before beforeAll has completed.
 *
 * @param {import('@playwright/test').TestType<any, any>} testApi
 * @param {{ label?: string, timeout?: number }} [options]
 * @returns {() => import('@playwright/test').Page}
 */
function registerWorldHooks(testApi, options = {}) {
    const { label = "", timeout = 60000 } = options;
    let page;

    testApi.beforeAll(async ({ browser }) => {
        ({ page } = await setupTestWorld(browser, label));
    }, timeout);

    testApi.afterAll(async () => {
        await shutdownWorld(page);
    });

    return () => {
        if (!page) {
            throw new Error("Test world page is not initialized yet.");
        }
        return page;
    };
}

/**
 * Standard setup fixture for all spec files. Creates browser context + page,
 * joins the pf2e test world, and wires up teardown.
 *
 * @param {import('@playwright/test').Browser} browser
 * @param {string} [label] - test suite name, posted as chat message in-world
 * @returns {Promise<{ page: import('@playwright/test').Page }>}
 */
async function setupTestWorld(browser, label = "") {
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    await initializePF2eWorld(page, label);
    return { page };
}

/**
 * Navigate to the Foundry setup page, select (or create) the pf2e test world,
 * authenticate as the first GM user, and wait for full readiness.
 *
 * Stores console errors on window.__pf2eworkbench_consoleErrors for later inspection.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} [label] - test suite name, posted as chat message in-world
 */
async function initializePF2eWorld(page, label = "") {
    page.on("console", (msg) => {
        if (msg.type() === "error") {
            page.evaluate((errMsg) => {
                window.__pf2eworkbench_consoleErrors = window.__pf2eworkbench_consoleErrors || [];
                window.__pf2eworkbench_consoleErrors.push(errMsg);
            }, msg.text());
        }
    });

    await page.goto(FOUNDRY_URL + "/setup", { waitUntil: "networkidle" });
    await dismissTourIfVisible(page);

    if (page.url().startsWith(FOUNDRY_URL + "/setup")) {
        const worldLink = page.locator(`[data-package-id="${WORLD_TITLE}"] a.play`);

        if ((await worldLink.count()) > 0) {
            await Promise.all([page.waitForNavigation(), worldLink.dispatchEvent("click")]);
            // Wait for the join page DOM to settle after navigation.
            await page.waitForLoadState("domcontentloaded");
            await dismissTourIfVisible(page);
        } else {
            await dismissTourIfVisible(page);
            await page.locator('button:has-text("Create World")').click({ force: true });
            await page.locator('input[name="title"]').fill(WORLD_TITLE);

            await selectSystemForWorldCreation(page, SYSTEM_ID);

            await submitWorldCreation(page);
        }
    }

    const alreadyInWorld = await page
        .evaluate(() => {
            return !!(window.game && window.game.ready && window.game.system?.id === "pf2e");
        })
        .catch(() => false);

    if (!alreadyInWorld) {
        await selectFirstAvailableUser(page);

        let isReady = false;
        for (let attempt = 0; attempt < MAX_JOIN_ATTEMPTS && !isReady; attempt++) {
            await page.locator('button:has-text("Join Game Session")').click({ force: true });

            isReady = await page
                .waitForFunction(
                    (expectedSystem) => {
                        if (!window.game || !window.game.ready) {
                            return false;
                        }
                        return window.game.system.id === expectedSystem;
                    },
                    SYSTEM_ID,
                    { timeout: 20000 },
                )
                .then(() => true)
                .catch(() => false);

            if (!isReady) {
                await selectFirstAvailableUser(page);
            }
        }

        if (!isReady) {
            throw new Error("Failed to enter the pf2e world after multiple join attempts.");
        }
    }

    await page.waitForTimeout(WAIT_MS_AFTER_WORLD_READY);
    await dismissTourIfVisible(page);

    await page.evaluate(() => {
        if (window.ui?.sidebar?.expand) {
            window.ui.sidebar.expand();
        }
    });

    if (label) {
        await page.evaluate(async (text) => {
            await ChatMessage.create({ content: `[test] ${text}` });
        }, label);
    }
}

/**
 * Select the first enabled user on the Join Game page.
 * Retries to handle temporary "current players full" state between spec files.
 *
 * @param {import('@playwright/test').Page} page
 */
async function selectFirstAvailableUser(page) {
    await dismissTourIfVisible(page);

    // selectOption({ index: 1 }) picks the first non-empty <option> and
    // handles all waiting internally — no manual visibility check needed.
    for (let attempt = 0; attempt < MAX_USER_SELECT_RETRIES; attempt++) {
        try {
            await page.locator('select[name="userid"]').first().selectOption({ index: 1 });
            return;
        } catch (e) {
            console.warn(
                `[xdy-pf2e-workbench test] selectFirstAvailableUser attempt ${attempt + 1}/${MAX_USER_SELECT_RETRIES} failed:`,
                e.message,
            );
        }

        await page.waitForTimeout(1000);
        try {
            await page.reload({ waitUntil: "networkidle" });
        } catch (e) {
            console.warn(
                "[xdy-pf2e-workbench test] selectFirstAvailableUser: page reload failed, continuing...",
                e.message,
            );
        }
        await dismissTourIfVisible(page);
    }

    throw new Error("Could not select a user on the Join Game screen after multiple attempts.");
}

/**
 * Select the requested system in world creation across Foundry UI variants.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} systemId
 */
async function selectSystemForWorldCreation(page, systemId) {
    const systemSelect = page.locator('select[name="system"]');
    const hasLegacySystemSelect = await systemSelect.isVisible().catch(() => false);
    if (hasLegacySystemSelect) {
        await systemSelect.selectOption(systemId);
        return;
    }

    const systemCardById = page.locator(`[data-package-id="${systemId}"]`).first();
    const hasSystemCardById = await systemCardById.isVisible().catch(() => false);
    if (hasSystemCardById) {
        await systemCardById.click({ force: true });
        return;
    }

    const pf2eCardByText = page
        .locator('[data-package-id], [role="listitem"], li')
        .filter({ hasText: /pf2e|pathfinder/i })
        .first();
    const hasCardByText = await pf2eCardByText.isVisible().catch(() => false);
    if (hasCardByText) {
        await pf2eCardByText.click({ force: true });
        return;
    }

    throw new Error(`Could not find a selectable system control for "${systemId}" during world creation.`);
}

/**
 * Submit world creation across Foundry UI variants and wait until join controls are ready.
 *
 * @param {import('@playwright/test').Page} page
 */
async function submitWorldCreation(page) {
    const submitButton = page.locator('button:has-text("Continue"), button:has-text("Create World")').first();

    await submitButton.click({ force: true });

    // User Management screen appears first — must click "Save and Continue" before
    // we reach the Join Game screen where user select is ready.
    const saveUsersButton = page.locator('button:has-text("Save and Continue")').first();
    const hasSaveUsers = await saveUsersButton.isVisible({ timeout: 3000 }).catch(() => false);
    if (hasSaveUsers) {
        await saveUsersButton.click({ force: true });
    }

    const userSelect = page.locator('select[name="userid"]').first();
    await userSelect.waitFor({ state: "visible", timeout: 30000 });
    await page.waitForLoadState("domcontentloaded");
}

/**
 * Close a Foundry guided tour if one is visible after world startup.
 * Keeps tests resilient when Foundry onboarding tours auto-open.
 *
 * @param {import('@playwright/test').Page} page
 */
async function dismissTourIfVisible(page) {
    const hasVisibleTour = await page
        .locator("aside.tour-center-step, aside.tour, .tour-overlay")
        .first()
        .isVisible({ timeout: 1500 })
        .catch(() => false);

    if (!hasVisibleTour) {
        return;
    }

    const closeSelectors = [
        'a.step-button[data-action="exit"]',
        'button.step-button[data-action="exit"]',
        '[data-action="exit"]',
        '[data-action="skip"]',
        '[data-action="close"]',
    ];

    // Try each close control selector in order
    for (const selector of closeSelectors) {
        const control = page.locator(selector).first();
        try {
            const isVisible = await control.isVisible();
            if (isVisible) {
                await control.click({ force: true });
                break;
            }
        } catch {
            // Control was detached or hidden between check and click — try next selector
        }
    }

    // Dismiss via keyboard as a secondary approach (only works on some tours)
    try {
        await page.keyboard.press("Escape");
    } catch (e) {
        console.warn("[xdy-pf2e-workbench test] dismissTour: Escape key failed:", e.message);
    }

    // Dismiss via Foundry tours API (only works in-world, not on setup page)
    try {
        await page.evaluate(async () => {
            const activeTours = game?.tours?.activeTours;
            if (!(activeTours instanceof Map)) return;
            for (const tour of activeTours.values()) {
                if (typeof tour?.exit === "function") {
                    await tour.exit();
                }
            }
        });
    } catch (e) {
        console.warn("[xdy-pf2e-workbench test] dismissTour: Tours API failed:", e.message);
    }

    // Brief stabilization wait after tour dismissal
    await page.waitForTimeout(WAIT_MS_AFTER_TOUR_DISMISS);
}

/**
 * Return collected console errors from window storage.
 * Call after tests to assert no errors.
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string[]>}
 */
async function getConsoleErrors(page) {
    return page.evaluate(() => window.__pf2eworkbench_consoleErrors || []);
}

/**
 * Filter out known-benign console errors.
 *
 * @param {string[]} errors
 * @param {RegExp[]} [benignPatterns]
 * @returns {string[]}
 */
function filterConsoleErrors(errors, benignPatterns = DEFAULT_BENIGN_CONSOLE_PATTERNS) {
    return errors.filter((msg) => !benignPatterns.some((pattern) => pattern.test(msg)));
}

/**
 * Assert there are no non-benign console errors.
 *
 * @param {import('@playwright/test').Page} page
 * @param {RegExp[]} [benignPatterns]
 */
async function assertNoConsoleErrors(page, benignPatterns = DEFAULT_BENIGN_CONSOLE_PATTERNS) {
    const errors = await getConsoleErrors(page);
    const realErrors = filterConsoleErrors(errors, benignPatterns);
    if (realErrors.length > 0) {
        throw new Error(`Console errors found:\n${realErrors.join("\n")}`);
    }
}

/**
 * Small UI stabilization delay used after actions that trigger renders.
 *
 * @param {import('@playwright/test').Page} page
 * @param {number} [ms]
 */
async function uiPause(page, ms = 500) {
    await page.waitForTimeout(ms);
}

/**
 * Gracefully shut down the Foundry world and close the page.
 *
 * @param {import('@playwright/test').Page} page
 */
async function shutdownWorld(page) {
    if (!page) {
        return;
    }

    try {
        await page.evaluate(async () => {
            if (game && typeof game.shutDown === "function") {
                await game.shutDown();
            }
        });
    } catch (e) {
        console.warn("[xdy-pf2e-workbench test] shutdownWorld: game.shutDown failed:", e.message);
    }

    // Give Foundry server time to fully release the world session.
    await page.waitForTimeout(WAIT_MS_BEFORE_SHUTDOWN);

    try {
        await page.close();
    } catch (e) {
        console.warn("[xdy-pf2e-workbench test] shutdownWorld: page.close failed:", e.message);
    }
}

module.exports = {
    setupTestWorld,
    registerWorldHooks,
    initializePF2eWorld,
    getConsoleErrors,
    filterConsoleErrors,
    assertNoConsoleErrors,
    shutdownWorld,
    uiPause,
    DEFAULT_BENIGN_CONSOLE_PATTERNS,
};
