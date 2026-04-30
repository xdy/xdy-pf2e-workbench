// Smoke tests for xdy-pf2e-workbench.
// Verifies the module loads, settings work, and no console errors occur.

const { test, expect } = require("@playwright/test");
const { registerWorldHooks, assertNoConsoleErrors } = require("./helpers");

test.describe("xdy-pf2e-workbench smoke tests", () => {
    const getPage = registerWorldHooks(test, { label: "xdy-pf2e-workbench smoke tests", timeout: 60000 });

    test("xdy-pf2e-workbench module loads", async () => {
        const page = getPage();
        const systemId = await page.evaluate(() => window.game.system.id);
        expect(systemId).toBe("pf2e");

        const sidebar = await page.evaluate(() => !!window.ui.sidebar);
        expect(sidebar).toBe(true);

        let isActive = await page.evaluate(() => {
            const mod = window.game.modules.get("xdy-pf2e-workbench");
            return mod ? mod.active : false;
        });

        if (!isActive) {
            await page.getByRole("button", { name: "Module Management" }).click();
            await page.getByRole("checkbox", { name: "PF2e Workbench" }).check();
            await page.getByRole("button", { name: "Save Module Settings" }).click();
            await page.getByRole("button", { name: "Yes" }).click();
            await page.reload({ waitUntil: "networkidle" });
            await page.waitForTimeout(2000);
            await page.waitForFunction(() => !!(window.game && window.game.ready), null, { timeout: 30000 });
        }

        isActive = await page.evaluate(() => {
            const mod = window.game.modules.get("xdy-pf2e-workbench");
            return mod ? mod.active : false;
        });

        expect(isActive).toBe(true);

        const npcMystifierEnabled = await page.evaluate(() => {
            try {
                return window.game.settings.get("xdy-pf2e-workbench", "npcMystifier");
            } catch {
                return null;
            }
        });
        expect(typeof npcMystifierEnabled).toBe("boolean");
    });
    test("no console errors during tests", async () => {
        const page = getPage();
        await assertNoConsoleErrors(page);
    });
});
