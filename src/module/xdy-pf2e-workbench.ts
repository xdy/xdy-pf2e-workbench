/**
 * Entrypoint for xdy-pf2e-workbench.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

// TODO Make it so holding shift pops up a dialog where one can change the name of the mystified creature
// TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
// TODO Make the button post a chat message with a properly set up RK roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify.
import { preloadTemplates } from "./preloadTemplates";
import { registerWorkbenchSettings } from "./settings";
import { doMystificationFromToken } from "./feature/tokenMystificationHandler";
import { registerWorkbenchKeybindings } from "./keybinds";
import { noOrSuccessfulFlatcheck } from "./feature/damageHandler";
import { moveSelectedAheadOfCurrent } from "./feature/initiativeHandler";
import { ActorPF2e } from "@actor";
import {
    addHeroPoints,
    calcRemainingMinutes,
    callHeroPointHandler,
    createRemainingTimeMessage,
    resetHeroPoints,
    startTimer,
} from "./feature/heroPointHandler";
import { isFirstGM } from "./utils";
import { enableNpcRollerButton, registerNpcRollerHandlebarsTemplates } from "./feature/npc-roller/NpcRoller";
import { loadSkillActions, loadSkillActionsBabele } from "./feature/skill-actions/sheet-skill-actions";
import { scaleNPCToLevelFromActor } from "./feature/cr-scaler/NPCScaler";
import { generateNameFromTraitsForToken } from "./feature/tokenMystificationHandler/traits-name-generator";
import { basicActionMacros } from "./feature/macros/basicActionMacros";
import { refocus } from "./feature/macros/refocus";
import { buildNpcSpellbookJournal } from "./feature/macros/buildNpcSpellbookJournal";
import { whirlwindStrike } from "./feature/macros/whirlwindStrike";
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
} from "./hooks";
import { onScaleNPCContextHook } from "./feature/cr-scaler/NPCScalerSetup";

export const MODULENAME = "xdy-pf2e-workbench";
export const NPC_TYPE = "npc";
export const CHARACTER_TYPE = "character";

const activeHooks = new Set();

export function createHooks() {
    if (!activeHooks.has("getActorDirectoryEntryContext")) {
        if (game.settings.get(MODULENAME, "npcScaler")) {
            Hooks.on("getActorDirectoryEntryContext", onScaleNPCContextHook);
            activeHooks.add("getActorDirectoryEntryContext");
        }
    } else {
        Hooks.off("getActorDirectoryEntryContext", onScaleNPCContextHook);
        activeHooks.delete("getActorDirectoryEntryContext");
    }

    if (!activeHooks.has("renderJournalDirectory")) {
        if (game.settings.get(MODULENAME, "npcRoller")) {
            Hooks.on("renderJournalDirectory", enableNpcRollerButton);
            activeHooks.add("renderJournalDirectory");
        }
    } else {
        Hooks.off("renderJournalDirectory", enableNpcRollerButton);
        activeHooks.delete("renderJournalDirectory");
    }

    if (!activeHooks.has("preCreateChatMessage")) {
        if (game.settings.get(MODULENAME, "castPrivateSpell")) {
            Hooks.on("preCreateChatMessage", preCreateChatMessageHook);
            activeHooks.add("preCreateChatMessage");
        }
    } else {
        Hooks.off("preCreateChatMessage", preCreateChatMessageHook);
        activeHooks.delete("preCreateChatMessage");
    }

    if (!activeHooks.has("createChatMessage")) {
        if (
            game.settings.get(MODULENAME, "autoRollDamageAllow") ||
            game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
            game.settings.get(MODULENAME, "autoRollDamageForSpellAttack") ||
            game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack") ||
            game.settings.get(MODULENAME, "automatedAnimationOn") ||
            game.settings.get(MODULENAME, "reminderBreathWeapon") ||
            game.settings.get(MODULENAME, "reminderTargeting") ||
            game.settings.get(MODULENAME, "reminderCannotAttack")
        ) {
            Hooks.on("createChatMessage", createChatMessageHook);
            activeHooks.add("createChatMessage");
        }
    } else {
        Hooks.off("createChatMessage", createChatMessageHook);
        activeHooks.delete("createChatMessage");
    }

    if (!activeHooks.has("renderChatMessage")) {
        if (
            game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
            game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault" ||
            game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent") === "collapsedDefault" ||
            game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent") === "nonCollapsedDefault" ||
            game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent") === "collapsedDefault" ||
            game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent") === "nonCollapsedDefault" ||
            game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll" ||
            game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew" ||
            game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNewest" ||
            game.settings.get(MODULENAME, "applyPersistentHealing") ||
            game.settings.get(MODULENAME, "applyPersistentDamage") ||
            (game.settings.get(MODULENAME, "npcMystifier") &&
                game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat"))
        ) {
            Hooks.on("renderChatMessage", renderChatMessageHook);
            activeHooks.add("renderChatMessage");
        }
    } else {
        Hooks.off("renderChatMessage", renderChatMessageHook);
        activeHooks.delete("renderChatMessage");
    }

    if (!activeHooks.has("createItem")) {
        if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
            Hooks.on("createItem", createItemHook);
            activeHooks.add("createItem");
        }
    } else {
        Hooks.off("createItem", createItemHook);
        activeHooks.delete("createItem");
    }

    if (!activeHooks.has("updateItem")) {
        if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
            Hooks.on("updateItem", updateItemHook);
            activeHooks.add("updateItem");
        }
    } else {
        Hooks.off("updateItem", updateItemHook);
        activeHooks.delete("updateItem");
    }

    if (!activeHooks.has("deleteItem")) {
        if (
            game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk") ||
            game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
            game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")
        ) {
            Hooks.on("deleteItem", deleteItemHook);
            activeHooks.add("deleteItem");
        }
    } else {
        Hooks.off("deleteItem", deleteItemHook);
        activeHooks.delete("deleteItem");
    }

    if (!activeHooks.has("pf2e.endTurn")) {
        if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
            Hooks.on("pf2e.endTurn", pf2eEndTurnHook);
            activeHooks.add("pf2e.endTurn");
        }
    } else {
        Hooks.off("pf2e.endTurn", pf2eEndTurnHook);
        activeHooks.delete("pf2e.endTurn");
    }

    if (!activeHooks.has("pf2e.startTurn")) {
        if (
            game.settings.get(MODULENAME, "actionsReminderAllow") !== "none" ||
            game.settings.get(MODULENAME, "autoReduceStunned")
        ) {
            Hooks.on("pf2e.startTurn", pf2eStartTurnHook);
            activeHooks.add("pf2e.startTurn");
        }
    } else {
        Hooks.off("pf2e.startTurn", pf2eStartTurnHook);
        activeHooks.delete("pf2e.startTurn");
    }

    if (!activeHooks.has("renderTokenHUD")) {
        if (game.settings.get(MODULENAME, "npcMystifier")) {
            Hooks.on("renderTokenHUD", renderTokenHUDHook);
            activeHooks.add("renderTokenHUD");
        }
    } else {
        Hooks.off("renderTokenHUD", renderTokenHUDHook);
        activeHooks.delete("renderTokenHUD");
    }

    if (!activeHooks.has("renderCharacterSheetPF2e")) {
        if (game.settings.get(MODULENAME, "maxHeroPoints") !== 3) {
            Hooks.on("renderCharacterSheetPF2e", renderCharacterSheetPF2eHook);
            activeHooks.add("renderCharacterSheetPF2e");
        }
    } else {
        Hooks.off("renderCharacterSheetPF2e", renderCharacterSheetPF2eHook);
        activeHooks.delete("renderCharacterSheetPF2e");
    }

    if (!activeHooks.has("preUpdateActor")) {
        if (
            (<string>game.settings.get(MODULENAME, "enableAutomaticMove")).startsWith("reaching0HP") ||
            game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none" ||
            game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none" ||
            game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP") ||
            (game.settings.get("pf2e", "automation.lootableNPCs") &&
                game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onZeroHp")
        ) {
            Hooks.on("preUpdateActor", preUpdateActorHook);
            activeHooks.add("preUpdateActor");
        }
    } else {
        Hooks.off("preUpdateActor", preUpdateActorHook);
        activeHooks.delete("preUpdateActor");
    }

    if (!activeHooks.has("preUpdateToken")) {
        if (game.settings.get(MODULENAME, "tokenAnimation")) {
            Hooks.on("preUpdateToken", preUpdateTokenHook);
            activeHooks.add("preUpdateToken");
        }
    } else {
        Hooks.off("preUpdateToken", preUpdateTokenHook);
        activeHooks.delete("preUpdateToken");
    }

    if (!activeHooks.has("createToken")) {
        if (
            game.settings.get(MODULENAME, "npcMystifier") ||
            (game.settings.get("pf2e", "automation.lootableNPCs") &&
                game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onScene")
        ) {
            Hooks.on("createToken", createTokenHook);
            activeHooks.add("createToken");
        }
    } else {
        Hooks.off("createToken", createTokenHook);
        activeHooks.delete("createToken");
    }

    if (!activeHooks.has("renderActorSheet")) {
        if (
            game.settings.get(MODULENAME, "playerFeatsRarityColour") ||
            game.settings.get(MODULENAME, "playerFeatsPrerequisiteHint") ||
            game.settings.get(MODULENAME, "playerSpellsRarityColour") ||
            game.settings.get(MODULENAME, "castPrivateSpell") ||
            game.settings.get(MODULENAME, "addGmRKButtonToNpc") ||
            game.settings.get(MODULENAME, "quickQuantities") ||
            game.settings.get(MODULENAME, "skillActions") !== "disabled" ||
            game.settings.get(MODULENAME, "creatureBuilder")
        ) {
            Hooks.on("renderActorSheet", renderActorSheetHook);
            activeHooks.add("renderActorSheet");
        }
    } else {
        Hooks.off("renderActorSheet", renderActorSheetHook);
        activeHooks.delete("renderActorSheet");
    }
}

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerWorkbenchSettings();

    await preloadTemplates();
    registerNpcRollerHandlebarsTemplates().then();

    registerHandlebarsHelpers();

    // Hooks that always run
    // Hooks.on("renderSettingsMenuPF2eWorkbench", (_app: any, html: JQuery, _settings: SettingsMenuPF2eWorkbench) => {
    //     toggleMenuSettings(html, _settings);
    // });

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
    createHooks();

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready

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
    if (text && text !== "") {
        // @ts-ignore
        game.i18n.translations.GAME.Paused = text;
    }

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
    console.log(`${MODULENAME} | Ready`);

    // Must be in ready

    if (isFirstGM()) {
        migrateFeatures().then();
    }

    if (game.modules.get("pf2e-sheet-skill-actions")?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.pf2e-sheet-skill-actions`));
    }

    if (game.modules.get("pf2e-toolbox")?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.pf2e-toolbox`));
    }

    if (game.settings.get(MODULENAME, "tokenAnimation") && game.modules.get("multilevel-tokens")?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.multilevel-tokens`));
    }

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
