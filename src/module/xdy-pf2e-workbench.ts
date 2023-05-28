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

import { debounce, isFirstGM, logInfo } from "./utils.js";
import { enableNpcRollerButton, registerNpcRollerHandlebarsTemplates } from "./feature/npc-roller/NpcRoller.js";
import { loadSkillActions, loadSkillActionsBabele } from "./feature/skill-actions/sheet-skill-actions.js";
import { scaleNPCToLevelFromActor } from "./feature/cr-scaler/NPCScaler.js";
import { generateNameFromTraitsForToken } from "./feature/tokenMystificationHandler/traits-name-generator.js";
import { basicActionMacros } from "./feature/macros/basicActionMacros.js";
import { refocus } from "./feature/macros/refocus.js";
import { buildNpcSpellbookJournal } from "./feature/macros/buildNpcSpellbookJournal.js";
import { whirlwindStrike } from "./feature/macros/whirlwindStrike.js";
import {
    createChatMessageHook,
    createItemHook,
    createTokenHook,
    deleteItemHook,
    pf2eEndTurnHook,
    pf2eStartTurnHook,
    preCreateChatMessageHook,
    preUpdateActorHook,
    preUpdateTokenHook,
    renderActorSheetHook,
    renderCharacterSheetPF2eHook,
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

function handle(hookName, shouldBeOn, hookFunction) {
    if (!activeHooks.has(hookName)) {
        if (shouldBeOn) {
            Hooks.on(hookName, hookFunction);
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
        game.socket.emit("module.xdy-pf2e-workbench", { operation: "updateHooks" });
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
            gs.get(MODULENAME, "handleDyingRecoveryRoll"),
        preCreateChatMessageHook
    );

    handle(
        "createChatMessage",
        gs.get(MODULENAME, "autoRollDamageAllow") ||
            gs.get(MODULENAME, "autoRollDamageForStrike") ||
            gs.get(MODULENAME, "autoRollDamageForSpellAttack") ||
            gs.get(MODULENAME, "autoRollDamageForSpellNotAnAttack") ||
            gs.get(MODULENAME, "automatedAnimationOn") ||
            gs.get(MODULENAME, "reminderBreathWeapon") ||
            gs.get(MODULENAME, "reminderCannotAttack") ||
            gs.get(MODULENAME, "autoGainDyingIfTakingDamageWhenAlreadyDying"),
        createChatMessageHook
    );

    handle(
        "renderChatMessage",
        true, // Due to support for minimumUserRole, this hook is always on
        renderChatMessageHook
    );

    handle(
        "createItem",
        gs.get(MODULENAME, "applyEncumbranceBasedOnBulk") ||
            game.settings.get(MODULENAME, "dropHeldItemsOnBecomingUnconscious"),
        debounce(createItemHook, 10)
    );

    handle("updateItem", gs.get(MODULENAME, "applyEncumbranceBasedOnBulk"), updateItemHook);

    handle(
        "deleteItem",
        gs.get(MODULENAME, "applyEncumbranceBasedOnBulk") ||
            gs.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
            gs.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP"),
        deleteItemHook
    );

    handle("pf2e.endTurn", gs.get(MODULENAME, "decreaseFrightenedConditionEachTurn"), pf2eEndTurnHook);

    handle(
        "pf2e.startTurn",
        gs.get(MODULENAME, "actionsReminderAllow") !== "none" || gs.get(MODULENAME, "autoReduceStunned"),
        pf2eStartTurnHook
    );

    handle("renderTokenHUD", gs.get(MODULENAME, "npcMystifier"), renderTokenHUDHook);

    handle("renderCharacterSheetPF2e", gs.get(MODULENAME, "maxHeroPoints") !== 3, renderCharacterSheetPF2eHook);

    handle(
        "preUpdateActor",
        (<string>gs.get(MODULENAME, "enableAutomaticMove")).startsWith("reaching0HP") ||
            !String(gs.get(MODULENAME, "autoGainDyingAtZeroHP")).startsWith("no") ||
            !String(gs.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP")).startsWith("no") ||
            gs.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP") ||
            (gs.get("pf2e", "automation.lootableNPCs") &&
                gs.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onZeroHp"),
        preUpdateActorHook
    );

    handle("preUpdateToken", gs.get(MODULENAME, "tokenAnimation"), preUpdateTokenHook);

    handle(
        "createToken",
        gs.get(MODULENAME, "npcMystifier") ||
            (gs.get("pf2e", "automation.lootableNPCs") &&
                gs.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onScene"),
        createTokenHook
    );

    handle(
        "renderActorSheet",
        gs.get(MODULENAME, "playerFeatsRarityColour") ||
            gs.get(MODULENAME, "playerFeatsPrerequisiteHint") ||
            gs.get(MODULENAME, "playerSpellsRarityColour") ||
            gs.get(MODULENAME, "castPrivateSpell") ||
            gs.get(MODULENAME, "quickQuantities") ||
            gs.get(MODULENAME, "skillActions") !== "disabled" ||
            gs.get(MODULENAME, "creatureBuilder"),
        renderActorSheetHook
    );

    changePauseText();
}

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    logInfo(`${MODULENAME} | Initializing xdy-pf2e-workbench`);
    phase = Phase.INIT;

    registerWorkbenchSettings();

    await preloadTemplates();
    registerNpcRollerHandlebarsTemplates().then();

    registerHandlebarsHelpers();

    // Hooks that always run
    Hooks.on("renderSettingsMenuPF2eWorkbench", (_app: any, html: JQuery, _settings: SettingsMenuPF2eWorkbench) => {
        toggleMenuSettings(html, _settings);
    });

    // Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
    //     toggleSettings(html);
    // });

    // Hooks that run once, if a setting is enabled. Manual refresh will still be needed for these.
    if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
        Hooks.once("babele.ready", async () => {
            if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
                loadSkillActionsBabele().then();
            }
        });
    }

    // Hooks that only run if a setting that needs it has been enabled
    updateHooks();

    // Register custom sheets (if any)
});

export function changePauseText() {
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
        if (text && text !== "") {
            // @ts-ignore
            game.i18n.translations.GAME.Paused = text;
        }
        const paused = !game.paused;
        game.togglePause(paused, true);
        new Promise((resolve) => setTimeout(resolve, 25)).then(() => game.togglePause(!paused, true));
    }
}

// Setup module
Hooks.once("setup", async () => {
    logInfo(`${MODULENAME} | Setting up`);
    phase = Phase.SETUP;
    // Do anything after initialization but before ready

    registerWorkbenchKeybindings();

    // General module setup
    if (game.settings.get(MODULENAME, "abpVariantAllowItemBonuses")) {
        game.pf2e.variantRules.AutomaticBonusProgression.suppressRuleElement = function suppressRuleElement(): boolean {
            return false;
        };
    }
});

async function migrateFeatures() {
    // Currently only flat check notes
    // @ts-ignore - no type definition for this yet
    const moduleVersion = game.modules.get(MODULENAME)?.version;
    const worldVersion = game.settings.get(MODULENAME, "workbenchVersion");
    if (moduleVersion !== worldVersion) {
        const pack = game.packs.find((p) => p.collection === `${MODULENAME}.xdy-pf2e-workbench-items`);
        await pack?.getIndex();
        const entry = pack?.index.find((e) => e.name.startsWith("Workbench Flat Check Notes"));
        const flatcheckNotes: any = await pack?.getDocument(<string>entry?._id);
        if (flatcheckNotes) {
            for (const actor of game.actors) {
                const filter = actor.items.filter((item) => item.name.startsWith("Workbench Flat Check Notes"));
                for (const item of filter) {
                    await actor.deleteEmbeddedDocuments("Item", [item.id]);
                }
                if (filter?.length > 0) {
                    await actor.createEmbeddedDocuments("Item", [flatcheckNotes.system]);
                }
            }

            for (const s of game.scenes) {
                // @ts-ignore
                for (const t of s.tokens) {
                    const actor = t.actor;
                    if (!actor || t.isLinked) {
                        // Ignore tokens with no actor as well as linked tokens (they have been handled above).
                        continue;
                    }
                    const filter = actor.items.filter((item) => item.name.startsWith("Workbench Flat Check Notes"));
                    for (const item of filter) {
                        await actor.deleteEmbeddedDocuments("Item", [item.id]);
                    }
                    if (filter?.length > 0) {
                        await actor.createEmbeddedDocuments("Item", [flatcheckNotes.system]);
                    }
                }
            }
        }

        // Set version so we don't migrate again.
        game.settings.set(MODULENAME, "workbenchVersion", moduleVersion);
    } else {
        return;
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
        whirlwindStrike: whirlwindStrike, // await game.PF2eWorkbench.whirlwindStrike(_token) OR await game.PF2eWorkbench.whirlwindStrike(_token, 2000)
        callHeroPointHandler: callHeroPointHandler, // await game.PF2eWorkbench.callHeroPointHandler()
    };

    if (isFirstGM()) {
        migrateFeatures().then();
    }

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

    try {
        updateHooks();
    } catch (e) {
        // Some kind of timing error that only happens when using another language than english, try again after 0.5 second
        new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
            updateHooks();
        });
    }

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

    if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
        loadSkillActions().then();
    }

    game.socket.on("module.xdy-pf2e-workbench", (operation) => {
        switch (operation) {
            case "updateHooks":
                if (!game.user.isGM) {
                    updateHooks();
                }
                break;
        }
    });

    if (game.settings.get(MODULENAME, "dirtySortActions") && !window["dirtySheetSorter"]) {
        const proto = CONFIG.Actor.sheetClasses.character["pf2e.CharacterSheetPF2e"].cls.prototype;
        const wrapped = proto.getData;
        proto.getData = async function (options) {
            const data = await wrapped.call(this, options);
            const actions = data.actor.actions;
            actions.action.actions.sort((a, b) => a.name.localeCompare(b.name));
            actions.reaction.actions.sort((a, b) => a.name.localeCompare(b.name));
            actions.free.actions.sort((a, b) => a.name.localeCompare(b.name));
            return data;
        };

        window["dirtySheetSorter"] = true;
        ui.notifications.info(game.i18n.localize(`${MODULENAME}.SETTINGS.dirtySortActions.info`));
    }
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
