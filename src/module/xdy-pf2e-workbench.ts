/**
 * Entrypoint for xdy-pf2e-workbench.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

// TODO Make it so holding shift pops up a dialog where one can change the name of the mystified creature
// TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
// TODO Make the button post a chat message with a properly set up RK roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify.
import { preloadTemplates } from "./preloadTemplates.js";
import { registerWorkbenchKeybindings } from "./keybinds.js";
import { ActorPF2e } from "@actor";

import { isFirstGM, logInfo } from "./utils.js";
import { enableNpcRollerButton, registerNpcRollerHandlebarsTemplates } from "./feature/npc-roller/NpcRoller.js";
import { scaleNPCToLevelFromActor } from "./feature/cr-scaler/NPCScaler.js";
import { generateNameFromTraitsForToken } from "./feature/tokenMystificationHandler/traits-name-generator.js";
import { basicActionMacros, registerBasicActionMacrosHandlebarsTemplates } from "./feature/macros/basicActionMacros.js";
import { buildNpcSpellbookJournal } from "./feature/macros/buildNpcSpellbookJournal.js";
import {
    createChatMessageHook,
    createItemHook,
    createTokenHook,
    deleteItemHook,
    pf2eEndTurnHook,
    pf2eRerollHook,
    pf2eStartTurnHook,
    pf2eSystemReadyHook,
    preCreateChatMessageHook,
    preUpdateActorHook,
    preUpdateTokenHook,
    renderActorSheetHook,
    renderChatMessageHook,
    renderTokenHUDHook,
    updateItemHook,
} from "./hooks.js";
import { onScaleNPCContextHook } from "./feature/cr-scaler/NPCScalerSetup.js";
import {
    addHeroPoints,
    calcRemainingMinutes,
    callHeroPointHandler,
    createRemainingTimeMessage,
    resetHeroPoints,
    startTimer,
} from "./feature/heroPointHandler/index.js";
import { moveSelectedAheadOfCurrent } from "./feature/initiativeHandler/index.js";
import { doMystificationFromToken } from "./feature/tokenMystificationHandler/index.js";
import { noOrSuccessfulFlatcheck } from "./feature/damageHandler/index.js";
import { registerWorkbenchSettings } from "./settings/index.js";
import { SettingsMenuPF2eWorkbench } from "./settings/menu.js";
import { toggleMenuSettings } from "./feature/settingsHandler/index.js";
import { mystifyNpcItems } from "./feature/qolHandler/index.js";
import { getAllFromAllowedPacks } from "./feature/api/getAllFromAllowedPacks.js";

import "../styles/xdy-pf2e-workbench.scss";
import { refocus } from "./feature/macros/refocus.js";

export const MODULENAME = "xdy-pf2e-workbench";
export const NPC_TYPE = "npc";
export const CHARACTER_TYPE = "character";

const activeHooks = new Set();

// Enum for phases
export enum Phase {
    DOWN = 0, // Before init, not sure if it has a name in foundry
    INIT = 10,
    SETUP = 20,
    READY = 30,
    ACTIVE = 40, // After ready, not sure if it has a name in foundry
}

export let phase: Phase = Phase.DOWN;

function handle(hookName, shouldBeOn, hookFunction, once = false) {
    if (!activeHooks.has(hookName)) {
        if (shouldBeOn) {
            if (once) {
                Hooks.once(hookName, hookFunction);
            } else {
                Hooks.on(hookName, hookFunction);
            }
            activeHooks.add(hookName);
        }
    } else {
        if (!shouldBeOn) {
            Hooks.off(hookName, hookFunction);
            activeHooks.delete(hookName);
        }
    }
}

export function updateHooks(cleanSlate = false) {
    if (phase > Phase.SETUP && game.user.isGM) {
        game.socket.emit("module." + MODULENAME, { operation: "updateHooks" });
    }
    if (cleanSlate) {
        activeHooks.clear();
    }

    const gs = game.settings;

    handle("getActorDirectoryEntryContext", gs.get(MODULENAME, "npcScaler"), onScaleNPCContextHook);
    handle("renderJournalDirectory", gs.get(MODULENAME, "npcRoller"), enableNpcRollerButton);

    handle(
        "preCreateChatMessage",
        gs.get(MODULENAME, "castPrivateSpell") ||
            gs.get(MODULENAME, "reminderTargeting") !== "no" ||
            gs.get(MODULENAME, "reminderCannotAttack") === "cancelAttack" ||
            gs.get(MODULENAME, "applyPersistentDamage"),
        preCreateChatMessageHook,
    );

    handle(
        "createChatMessage",
        gs.get(MODULENAME, "autoRollDamageAllow") ||
            gs.get(MODULENAME, "autoRollDamageForStrike") ||
            gs.get(MODULENAME, "autoRollDamageForSpellAttack") ||
            gs.get(MODULENAME, "autoRollDamageForSpellWhenNotAnAttack") !== "no" ||
            gs.get(MODULENAME, "automatedAnimationOn") ||
            gs.get(MODULENAME, "reminderBreathWeapon") ||
            gs.get(MODULENAME, "reminderCannotAttack") === "reminder" ||
            gs.get(MODULENAME, "autoGainDyingIfTakingDamageWhenAlreadyDying"),
        createChatMessageHook,
    );

    handle(
        "renderChatMessage",
        true, // Due to support for minimumUserRole, this hook is always on
        renderChatMessageHook,
    );

    handle(
        "createItem",
        game.settings.get(MODULENAME, "dropHeldItemsOnBecomingUnconscious"),
        fu.debounce(createItemHook, 10),
    );

    handle("updateItem", false, updateItemHook);

    handle(
        "deleteItem",
        gs.get(MODULENAME, "giveWoundedWhenDyingRemoved") || gs.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP"),
        deleteItemHook,
    );

    handle("pf2e.systemReady", gs.get(MODULENAME, "housepatcher") !== "", pf2eSystemReadyHook, true);

    handle("pf2e.endTurn", gs.get(MODULENAME, "decreaseFrightenedConditionEachTurn"), pf2eEndTurnHook);

    handle(
        "pf2e.startTurn",
        gs.get(MODULENAME, "actionsReminderAllow") !== "none" || gs.get(MODULENAME, "autoReduceStunned"),
        pf2eStartTurnHook,
    );

    handle("pf2e.reroll", gs.get(MODULENAME, "keeleysHeroPointRule"), pf2eRerollHook);

    handle("renderTokenHUD", gs.get(MODULENAME, "npcMystifier"), renderTokenHUDHook);

    handle(
        "preUpdateActor",
        (<string>gs.get(MODULENAME, "enableAutomaticMove")).startsWith("reaching0HP") ||
            !String(gs.get(MODULENAME, "autoGainDyingAtZeroHP")).startsWith("no") ||
            !String(gs.get(MODULENAME, "nonLethalIsNotLethal")).startsWith("no") ||
            !String(gs.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP")).startsWith("no") ||
            gs.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP") ||
            (gs.get("pf2e", "automation.lootableNPCs") &&
                gs.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onZeroHp"),
        preUpdateActorHook,
    );

    handle("preUpdateToken", gs.get(MODULENAME, "tokenAnimation"), preUpdateTokenHook);

    handle(
        "createToken",
        gs.get(MODULENAME, "npcMystifier") ||
            (gs.get("pf2e", "automation.lootableNPCs") &&
                gs.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onScene"),
        createTokenHook,
    );

    handle(
        "renderActorSheet",
        // gs.get(MODULENAME, "playerFeatsRarityColour") ||
        //     gs.get(MODULENAME, "playerFeatsPrerequisiteHint") ||
        //     gs.get(MODULENAME, "playerSpellsRarityColour") ||
        //     gs.get(MODULENAME, "castPrivateSpell") ||
        true, // Due to legacy variant rules this hook is always on
        renderActorSheetHook,
    );

    changePauseText();
}

Hooks.on("renderPause", (_app, _html, _options) => {
    changePauseText();
});

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    logInfo(`${MODULENAME} | Initializing xdy-pf2e-workbench`);
    phase = Phase.INIT;

    registerWorkbenchSettings();

    await preloadTemplates();
    registerNpcRollerHandlebarsTemplates().then();

    registerBasicActionMacrosHandlebarsTemplates().then();

    registerHandlebarsHelpers();

    // Hooks that always run
    Hooks.on("renderSettingsMenuPF2eWorkbench", (_app: any, html: JQuery, _settings: SettingsMenuPF2eWorkbench) => {
        toggleMenuSettings(html, _settings);
        _app.setPosition();
    });

    // Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
    //     toggleSettings(html);
    // });

    // Hooks that run once, if a setting is enabled. Manual refresh will still be needed for these.

    // Hooks that only run if a setting that needs it has been enabled
    updateHooks();

    // Register custom sheets (if any)
});

export function changePauseText() {
    if (game.release.generation > 12) {
        console.log("PF2e Workbench: Changing pause text is not (yet) supported in foundry 12");
        return;
    }

    if (!document?.querySelector("#pause")?.classList.contains("paused")) {
        return;
    }

    if (game.settings.get(MODULENAME, "customPauseImage") !== "") {
        // Set css variables for the module
        const path = <string>game.settings.get(MODULENAME, "customPauseImage");
        const prefix = path.startsWith("http") ? "" : "../../../";
        document.documentElement.style.setProperty("--xdy-pf2e-workbench-pause", "url(" + prefix + path + ")");
    }

    document.documentElement.style.setProperty("--xdy-pf2e-workbench-pause-bottom", "10%");
    document.documentElement.style.setProperty("--xdy-pf2e-workbench-pause-figcaption-top", "0%");
    if (game.settings.get(MODULENAME, "customPauseRelocation")) {
        document.documentElement.style.setProperty("--xdy-pf2e-workbench-pause-bottom", "calc(50% - 64px)");
        document.documentElement.style.setProperty("--xdy-pf2e-workbench-pause-figcaption-top", "-100%");
        document.documentElement.style.setProperty("--xdy-pf2e-workbench-pause-background", "");
    }

    const text = game.settings.get(MODULENAME, "customPauseText");
    if (phase >= Phase.READY) {
        const element = document.querySelector("figcaption");
        if (text && text !== "" && element) {
            // @ts-ignore
            element.textContent = text;
            const pauseText = game?.i18n?.translations?.GAME["Paused"];
            if (pauseText) {
                game.i18n.translations.GAME["Paused"] = text;
            }
        }
        // const paused = !game.paused;
        // game.togglePause(paused, true);
        // new Promise((resolve) => setTimeout(resolve, 25)).then(() => game.togglePause(!paused, true));
    }
}

// Setup module
Hooks.once("setup", async () => {
    logInfo(`${MODULENAME} | Setting up`);
    phase = Phase.SETUP;
    // Do anything after initialization but before ready

    registerWorkbenchKeybindings();

    // General module setup
});

function handleCampaignFeatSection() {
    const legacyVariantRuleAncestryParagon = game.settings.get(MODULENAME, "legacyVariantRuleAncestryParagon");
    const legacyVariantRuleDualClass = game.settings.get(MODULENAME, "legacyVariantRuleDualClass");

    // Add campaign feat sections if enabled
    if (legacyVariantRuleDualClass || legacyVariantRuleAncestryParagon) {
        const campaignFeatSections = game.settings.get("pf2e", "campaignFeatSections");
        if (legacyVariantRuleAncestryParagon) {
            if (!campaignFeatSections.find((section) => section.id === "xdy_ancestryparagon")) {
                campaignFeatSections.push({
                    id: "xdy_ancestryparagon",
                    label: game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleAncestryParagon.title`),
                    supported: ["ancestry"],
                    slots: [1, 3, 7, 11, 15, 19],
                });
            }
        }

        if (legacyVariantRuleDualClass) {
            if (!campaignFeatSections.find((section) => section.id === "xdy_dualclass")) {
                campaignFeatSections.push({
                    id: "xdy_dualclass",
                    label: game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.title`),
                    supported: ["class"],
                    slots: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                });
            }
        }

        game.settings.set("pf2e", "campaignFeatSections", campaignFeatSections);
    }

    const campaignFeatSections = game.settings.get("pf2e", "campaignFeatSections");
    // ... or remove it if disabled.
    if (
        campaignFeatSections &&
        !legacyVariantRuleDualClass &&
        campaignFeatSections.find((section) => section.id === "xdy_dualclass")
    ) {
        campaignFeatSections.splice(
            campaignFeatSections.findIndex((section) => section.id === "xdy_dualclass"),
            1,
        );
        game.settings.set("pf2e", "campaignFeatSections", campaignFeatSections);
    }

    if (
        campaignFeatSections &&
        !legacyVariantRuleAncestryParagon &&
        campaignFeatSections.find((section) => section.id === "xdy_ancestryparagon")
    ) {
        campaignFeatSections.splice(
            campaignFeatSections.findIndex((section) => section.id === "xdy_ancestryparagon"),
            1,
        );
        game.settings.set("pf2e", "campaignFeatSections", campaignFeatSections);
    }
}

// When ready
Hooks.once("ready", () => {
    // Do anything once the module is ready
    logInfo(`${MODULENAME} | Ready`);
    phase = Phase.READY;

    // Must be in ready

    // Make some functions available for macros
    // noinspection JSUnusedGlobalSymbols
    // @ts-ignore
    game.PF2eWorkbench = {
        resetHeroPoints: resetHeroPoints, // game.PF2eWorkbench.resetHeroPoints(1)
        addHeroPoints: addHeroPoints, // game.PF2eWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
        scaleNPCToLevelFromActor: scaleNPCToLevelFromActor, // game.PF2eWorkbench.scaleNPCToLevelFromActor(_token.actor.id, 24);
        moveSelectedAheadOfCurrent: moveSelectedAheadOfCurrent, // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantByToken(_token.id).id)
        doMystificationFromToken: doMystificationFromToken, // await game.PF2eWorkbench.doMystificationFromToken(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromToken(_token.id, false)
        generateNameFromTraitsFromTokenId: generateNameFromTraitsForToken, // await game.PF2eWorkbench.generateNameFromTraitsFromTokenId(_token.id)
        noOrSuccessfulFlatcheck: noOrSuccessfulFlatcheck, // await game.PF2eWorkbench.noOrSuccessfulFlatcheck(game.messages.get("messageId"))
        basicActionMacros: basicActionMacros, // await game.PF2eWorkbench.basicActionMacros()
        refocus: refocus, // await game.PF2eWorkbench.refocus()
        buildNpcSpellbookJournal: buildNpcSpellbookJournal, // await game.PF2eWorkbench.buildNpcSpellbookJournal()
        callHeroPointHandler: callHeroPointHandler, // await game.PF2eWorkbench.callHeroPointHandler()
        mystifyNpcItems: mystifyNpcItems, // await game.PF2eWorkbench.mystifyNpcItems() OR await game.PF2eWorkbench.mystifyNpcItems(items, minimumRarity, usingPartyLevel, minimumLevel, multiplier)
        getAllFromAllowedPacks: getAllFromAllowedPacks, // await game.PF2eWorkbench.getAllFromAllowedPacks({ type, fields, filter, strictSourcing, fetch})
    };

    if (game.modules.get("pf2e-sheet-skill-actions")?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.pf2e-sheet-skill-actions`));
    }

    if (game.modules.get("pf2e-toolbox")?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.pf2e-toolbox`));
    }

    const ta = game.settings.get(MODULENAME, "tokenAnimation");
    const mlt = game.modules.get("multilevel-tokens");
    if (ta && mlt?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.multilevel-tokens`));
    }

    updateHooks();

    // TODO Instead of opening immediately, add a handler that hooks onto the *first* unpause, and starts then.
    // TODO Check if more than 'timer max' minutes have passed, if so assume new start and reset to 'timer max' minutes.
    if (isFirstGM() && game.settings.get(MODULENAME, "heroPointHandler")) {
        let remainingMinutes = calcRemainingMinutes(false);
        if (remainingMinutes > 0 || game.settings.get(MODULENAME, "heroPointHandlerStartTimerOnReady")) {
            remainingMinutes = calcRemainingMinutes(true);
            startTimer(remainingMinutes).then(() => {
                createRemainingTimeMessage(remainingMinutes);
            });
        }
    }

    game.socket.on("module." + MODULENAME, (operation) => {
        switch (operation?.operation) {
            case "updateHooks":
                if (!game.user.isGM) {
                    updateHooks();
                }
                break;
            case "notification":
                if (!game.user.isGM) {
                    const type = operation.args[0];
                    const message = operation.args[1];
                    ui.notifications.notify(message, type);
                }
                break;
            default:
                break;
        }
    });

    handleCampaignFeatSection();

    phase = Phase.ACTIVE;
    Hooks.callAll(`${MODULENAME}.moduleReady`);
});

function registerHandlebarsHelpers() {
    Handlebars.registerHelper("xdy_includes", function (array: any[], value: any, options: any) {
        if (array.includes(value)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("xdy_ifeq", function (v1, v2, options) {
        if (v1 === v2) return options.fn(this);
        else return options.inverse();
    });
    Handlebars.registerHelper("xdy_ifne", function (v1, v2, options) {
        if (v1 !== v2) return options.fn(this);
        else return options.inverse();
    });

    Handlebars.registerHelper("xdy_isNaN", function (context, options) {
        if (isNaN(context) && !(typeof context === "string")) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("xdy_undefined", function () {
        return undefined;
    });

    Handlebars.registerHelper("xdy_hasKey", function (context, key) {
        for (const prop of context) {
            if (Object.getOwnPropertyDescriptor(prop, key)) {
                return true;
            }
        }
        return false;
    });
}
