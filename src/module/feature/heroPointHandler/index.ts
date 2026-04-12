// These usecases should be handled
// * Show a new handle  r, set timeout to 60, ignore on the first, none on the second
// * Check on an existing timer, recalc timeout, ignore on the first, none on the second
// * Timeout, recalc timeout, ignore on the first, random on the second

import type { ActorPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { handleAsync, heroes, logDebug, pushNotification } from "../../utils.js";

export enum HPHState {
    Start,
    Check,
    Timeout,
}

const ONE_MINUTE_IN_MS = 60 * 1000;
let isHeroPointHandlerDialogOpen = false;

type HeroPointHandlerButton = "timer" | "noTimer";
type HeroPointRecipient = "ALL" | "NONE" | string;

type HeroPointHandlerResult = {
    button: HeroPointHandlerButton;
    remainingMinutes: number;
    reason: string;
};

type HeroPointHandlerTemplateActor = {
    id: string;
    name: string;
    radioId: string;
    checked: boolean;
};

type HeroPointHandlerTemplateData = {
    instructions: string;
    doWhat: string;
    resetTo: string;
    addLabel: string;
    ignore: string;
    thisMany: string;
    addOne: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    actors: HeroPointHandlerTemplateActor[];
    timerValue: string;
    timerMinutes: number;
    maxMinutes: number;
    showAfter: string;
    submitShortLabel: string;
    stopShortLabel: string;
};

function getHeroPointHandlerTemplatePath(): string {
    return `modules/${MODULENAME}/templates/feature/heropoint-handler/index.hbs`;
}

async function stopTimer(): Promise<void> {
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.startTime");
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.remainingMinutes");
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.timeout");
}

export async function startTimer(remainingMinutes: number): Promise<void> {
    const oldTimeout = <NodeJS.Timeout>game.user?.getFlag(MODULENAME, "heroPointHandler.timeout");
    if (oldTimeout) {
        clearTimeout(oldTimeout);
    }
    if (remainingMinutes > 0) {
        const ms = remainingMinutes * ONE_MINUTE_IN_MS;
        const timeout = setTimeout(async () => {
            await heroPointHandler(HPHState.Timeout);
        }, ms);

        const updateData = {
            flags: {
                "xdy-pf2e-workbench": {
                    heroPointHandler: {
                        startTime: game.time.serverTime,
                        remainingMinutes: remainingMinutes,
                        timeout: timeout,
                    },
                },
            },
        };
        await game.user?.update(updateData);
    } else if (!remainingMinutes || remainingMinutes <= 0) {
        await stopTimer();
    }
}

/**
 * Calls the heroPointHandler function with the HPHState.Timeout parameter.
 *
 * @return {Promise<any>} The result of the heroPointHandler function.
 */
export async function callHeroPointHandler(): Promise<void> {
    return heroPointHandler(HPHState.Timeout);
}

export function createRemainingTimeMessage(remainingMinutes: number): void {
    const message =
        remainingMinutes > 0
            ? game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.willBeResetIn`, {
                  remainingMinutes: remainingMinutes,
                  time: new Date(Date.now() + remainingMinutes * ONE_MINUTE_IN_MS).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                  }),
              })
            : game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.timerStopped`);
    sendMessage(message, [game.user.id]);
}

export async function heroPointHandler(state: HPHState): Promise<void> {
    if (isHeroPointHandlerDialogOpen) {
        return;
    }

    isHeroPointHandlerDialogOpen = true;

    try {
        let remainingMinutes: number;
        switch (state) {
            case HPHState.Start:
                remainingMinutes = Number.parseInt(
                    String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
                );
                break;
            case HPHState.Check:
                remainingMinutes = calcRemainingMinutes(true);
                break;
            case HPHState.Timeout:
                remainingMinutes = Number.parseInt(
                    String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
                );
                break;
        }

        const title = `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.title`)} (${
            remainingMinutes
                ? remainingMinutes + " " + game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.minutesLeft`)
                : game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.noRunningTimer`)
        })`;

        const content = await buildHtml(remainingMinutes, state);

        const submitTooltip = game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.startTimerLabel`);
        const stopTooltip = game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.noTimerLabel`);
        const dialogWidth = 375;

        const renderHookId = Hooks.on("renderDialogV2", (app: foundry.applications.api.DialogV2) => {
            if (!app.options.window.contentClasses?.includes("hero-point-handler-window")) {
                return;
            }
            Hooks.off("renderDialogV2", renderHookId);

            const el: HTMLElement = app.element;
            const top = Math.round((window.innerHeight - el.offsetHeight) / 2);
            el.style.top = `${top}px`;
            app.position.top = top;
            el.style.left = `${Math.round((window.innerWidth - dialogWidth) / 2)}px`;
            el.style.width = `${dialogWidth}px`;

            const titleEl = el.querySelector<HTMLElement>(".window-title");
            if (titleEl) {
                titleEl.innerHTML = title;
            }

            const footerButtons = el.querySelectorAll<HTMLButtonElement>("footer button[data-action]");
            for (const footerButton of footerButtons) {
                switch (footerButton.dataset.action) {
                    case "timer":
                        footerButton.title = submitTooltip;
                        footerButton.setAttribute("aria-label", submitTooltip);
                        break;
                    case "noTimer":
                        footerButton.title = stopTooltip;
                        footerButton.setAttribute("aria-label", stopTooltip);
                        break;
                }
            }
        });

        const result = <HeroPointHandlerResult | null>await foundry.applications.api.DialogV2.wait({
            position: {
                left: Math.round((window.innerWidth - dialogWidth) / 2),
                width: dialogWidth,
                height: "auto",
            },
            window: {
                title,
                resizable: true,
                positioned: true,
                contentClasses: ["hero-point-handler-window"],
                icon: "fa-solid fa-hourglass",
            },
            content,
            buttons: [
                {
                    action: "timer",
                    label: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.submitShortLabel`),
                    default: true,
                    callback: async (_event, button, _dialog) => {
                        const response = handleDialogResponse(button.form ?? button.closest("form"));
                        return {
                            button: "timer",
                            remainingMinutes: response.remainingMinutes,
                            reason: response.reason,
                        };
                    },
                },
                {
                    action: "noTimer",
                    label: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.stopShortLabel`),
                    callback: async (_event, button, _dialog) => {
                        handleDialogResponse(button.form ?? button.closest("form"));
                        return {
                            button: "noTimer",
                            remainingMinutes: 0,
                            reason: "",
                        };
                    },
                },
            ],
            close: () => {
                Hooks.off("renderDialogV2", renderHookId);
            },
        });

        if (!result) {
            return;
        }

        switch (result.button) {
            case "timer":
                await startTimer(result.remainingMinutes);
                break;
            case "noTimer":
                await stopTimer();
                break;
        }

        createRemainingTimeMessage(result.remainingMinutes);
    } finally {
        isHeroPointHandlerDialogOpen = false;
    }
}

// Constants
const PARTY_MEMBERS_FLAG_KEY = "partymembersThatHaveGottenHeropoints";

/**
 * Selects a random party member index from the provided list of actors,
 * ensuring the same actor is not repeatedly selected until all have been selected.
 *
 * @param {ActorPF2e[]} actors - The list of party members to select from.
 * @return {Promise<number>} The index of the selected actor in the input array, or -1 if the input array is empty.
 */
async function randomPartymemberThatHasNotReceivedAHeropoint(actors: ActorPF2e[]): Promise<number> {
    if (actors.length === 0) {
        await game.actors?.party?.unsetFlag(MODULENAME, PARTY_MEMBERS_FLAG_KEY);
        return -1;
    }

    const existingFlagValue =
        <string | null | undefined>game.actors?.party?.getFlag(MODULENAME, PARTY_MEMBERS_FLAG_KEY) ?? "";
    logDebug("Hero point handler existing party flag value", existingFlagValue);
    const hasReceivedHP: Set<string> = existingFlagValue ? new Set(existingFlagValue.split(",")) : new Set();
    const noHPYet = actors.filter((actor) => !hasReceivedHP.has(actor.id));

    if (noHPYet.length === 0) {
        hasReceivedHP.clear();
        noHPYet.push(...actors);
    }
    const randomIndex: number = Math.floor(Math.random() * noHPYet.length);
    const selectedActorId = noHPYet[randomIndex]?.id ?? "";
    hasReceivedHP.add(selectedActorId);
    await game.actors?.party?.setFlag(MODULENAME, PARTY_MEMBERS_FLAG_KEY, [...hasReceivedHP].join(","));

    return actors.findIndex((actor) => actor.id === selectedActorId);
}

async function buildHtml(remainingMinutes: number, state: HPHState): Promise<string> {
    const actors = heroes();
    const checkedSet = new Set<number>();
    switch (state) {
        case HPHState.Start:
            break;
        case HPHState.Timeout: {
            let selectedActor = -1;
            switch (game.settings.get(MODULENAME, "heropointHandlerRandomization")) {
                case "none":
                    break;
                case "random":
                    selectedActor = Math.floor(Math.random() * actors.length);
                    break;
                case "randomPartymemberThatHasNotReceivedAHeropoint":
                    selectedActor = await randomPartymemberThatHasNotReceivedAHeropoint(actors);
            }
            if (actors.length > 0 && selectedActor >= 0) {
                checkedSet.add(selectedActor);
            }
            break;
        }
        case HPHState.Check:
            break;
    }

    const maxMinutes = Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")));
    const templateData: HeroPointHandlerTemplateData = {
        instructions: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.instructions`),
        doWhat: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.doWhat`),
        resetTo: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.resetTo`),
        addLabel: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.add`),
        ignore: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.ignore`),
        thisMany: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.thisMany`),
        addOne: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.addOne`),
        actors: actors.map((actor, index) => {
            const currentHeroPoints = actor?.isOfType("character") ? actor.system.resources.heroPoints.value : 0;
            const maxHeroPoints = actor?.isOfType("character") ? actor.system.resources.heroPoints.max : 3;
            const ownerName =
                game.users?.find((u) => !u.isGM && actor?.ownership[u.id] === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
                    ?.name ?? "";
            const ownerSuffix = ownerName ? ` (${ownerName})` : "";
            return {
                id: actor.id,
                name: `${actor.name}${ownerSuffix} [${currentHeroPoints}/${maxHeroPoints}]`,
                radioId: `characters-${index}`,
                checked: checkedSet.has(index),
            };
        }),
        timerValue: game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.timerValue`, {
            maxMinutes,
        }),
        timerMinutes: remainingMinutes || maxMinutes,
        maxMinutes,
        reasonLabel: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.reasonLabel`),
        reasonPlaceholder: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.reasonPlaceholder`),
        showAfter: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.showAfter`),
        submitShortLabel: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.submitShortLabel`),
        stopShortLabel: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.stopShortLabel`),
    };

    return foundry.applications.handlebars.renderTemplate(getHeroPointHandlerTemplatePath(), templateData);
}

export function calcRemainingMinutes(useDefault: boolean): number {
    const savedTime: number = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.startTime");
    const savedMinutes = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes");
    const remainingMinutes: number = Math.clamp(
        savedMinutes ??
            (useDefault
                ? Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")))
                : 0),
        0,
        Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes"))),
    );
    const passedMillis = game.time.serverTime - (savedTime ?? game.time.serverTime);
    return remainingMinutes - Math.floor(passedMillis / ONE_MINUTE_IN_MS);
}

/**
 * Resets the hero points for all heroes in the game.
 *
 * @param {number} heropoints - The number of hero points to set for each hero.
 * @return {Promise<void>} - A promise that resolves when all hero points have been updated.
 */
export async function resetHeroPoints(heropoints: number): Promise<void> {
    for (const actor of heroes()) {
        if (!actor.isOfType("character")) {
            continue;
        }

        await actor.update({
            "system.resources.heroPoints.value": Math.min(heropoints, actor.system.resources.heroPoints.max),
        });
    }
}

/**
 * Adds hero points to the specified actor or all actors.
 *
 * @param {number} heropoints - The number of hero points to add.
 * @param {any} [actorId="ALL"] - The ID of the actor to add hero points to. If "ALL" is specified, hero points will be added to all actors.
 * @return {Promise<void>} - A promise that resolves when the hero points have been added.
 */
export async function addHeroPoints(heropoints: number, actorId: HeroPointRecipient = "ALL"): Promise<void> {
    let actors: ActorPF2e[];
    switch (actorId) {
        case "ALL":
            actors = heroes();
            break;
        case "NONE":
            actors = [];
            break;
        default:
            actors = game.actors?.has(actorId) ? [game.actors.get(actorId, { strict: true })] : [];
            break;
    }

    for (const actor of actors) {
        if (!actor.isOfType("character")) {
            continue;
        }

        const system = actor.system;
        const value = Math.min(system.resources.heroPoints.value + heropoints, actor.system.resources.heroPoints.max);
        await actor.update({
            "system.resources.heroPoints.value": value,
        });
    }
}

function addOneToSelectedCharactersIfAny(actorIds: string[], reason: string = ""): void {
    for (const actorId of actorIds) {
        addHeroPoints(1, actorId).then(() => {
            const name = game?.actors?.find((actor) => actor.id === actorId)?.name;
            if (name) {
                let message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedFor`, {
                    name: name,
                });
                if (reason) {
                    message += ` (${reason})`;
                }
                sendMessage(message);
                if (game.settings.get(MODULENAME, "heropointHandlerNotification")) {
                    pushNotification(message);
                }
            }
        });
    }
}

function sendMessage(message: string, whisper: string[] | undefined = undefined) {
    if (game.settings.get(MODULENAME, "heropointHandlerNotificationChat")) {
        handleAsync(ChatMessage.create({ flavor: message, whisper }, {}), "heroPointHandler ChatMessage");
    } else {
        ui.notifications.info(message);
    }
}

function handleDialogResponse(element: ParentNode | null): { remainingMinutes: number; reason: string } {
    if (!element) {
        return { remainingMinutes: 0, reason: "" };
    }

    const sessionStartEl = element.querySelector<HTMLInputElement>('input[name="sessionStart"]:checked');
    const sessionStart = sessionStartEl ? sessionStartEl.value : "IGNORE";

    const heroPointsEl = element.querySelector<HTMLInputElement>('input[name="heropoints"]');
    const heroPoints = heroPointsEl ? Number.parseInt(heroPointsEl.value) : 1;

    const reasonEl = element.querySelector<HTMLInputElement>('input[name="reason"]');
    const reason = reasonEl ? reasonEl.value : "";

    const actorIdEls = element.querySelectorAll<HTMLInputElement>('input[name="characters"]:checked');
    const actorIds: string[] = Array.from(actorIdEls).map((el) => el.value);

    const remainingMinutesEl = element.querySelector<HTMLInputElement>('input[name="timerText"]');
    const maxMinutes = Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")));
    const remainingMinutes = Math.clamp(
        remainingMinutesEl ? Number.parseInt(remainingMinutesEl.value) || 0 : 0,
        0,
        maxMinutes,
    );

    if (sessionStart === "RESET") {
        resetHeroPoints(heroPoints).then(() => {
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.resetToForAll`, {
                heroPoints: heroPoints,
            });
            sendMessage(message);
            addOneToSelectedCharactersIfAny(actorIds, reason);
        });
    } else if (sessionStart === "ADD") {
        addHeroPoints(heroPoints).then(() => {
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedToForAll`, {
                heroPoints: heroPoints,
            });

            sendMessage(message);
            addOneToSelectedCharactersIfAny(actorIds, reason);
        });
    } else if (sessionStart === "IGNORE") {
        addOneToSelectedCharactersIfAny(actorIds, reason);
    }

    return { remainingMinutes, reason };
}
