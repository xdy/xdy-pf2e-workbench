/**
 * Entrypoint for xdy-pf2e-workbench.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

import { preloadTemplates } from "./preloadTemplates.ts";
import "../styles/xdy-pf2e-workbench.scss";

// TODO Make it so holding shift pops up a dialog where one can change the name of the mystified creature
// TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
// TODO Make the button post a chat message with a properly set up RK roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify.
import { registerWorkbenchKeybindings } from "./keybinds.ts";
import { ActorPF2e } from "foundry-pf2e";

import { fireAndForget, getModuleSetting, isFirstGM } from "./utils.ts";
import { logInfo } from "./utils/logging.ts";
import * as systems from "./utils/systems.ts";
import {
    enableNpcRollerButton,
    NpcRoller,
    registerNpcRollerHandlebarsTemplates,
} from "./feature/npc-roller/NpcRoller.ts";
import { scaleNPCToLevelFromActor } from "./feature/cr-scaler/NPCScaler.ts";
import { generateNameFromTraitsForToken } from "./feature/tokenMystificationHandler/traits-name-generator.ts";
import { basicActionMacros, registerBasicActionMacrosHandlebarsTemplates } from "./feature/macros/basicActionMacros.ts";
import { buildNpcSpellbookJournal } from "./feature/macros/buildNpcSpellbookJournal.ts";
import {
    combatStartHook,
    createChatMessageHook,
    createTokenHook,
    deleteCombatHook,
    deleteItemHook,
    pf2eEndTurnHook,
    pf2eRerollHook,
    pf2eStartTurnHook,
    pf2eSystemReadyHook,
    pf2eToolbeltRollSaveHook,
    preCreateChatMessageHook,
    preCreateItemHook,
    preUpdateActorHook,
    preUpdateTokenHook,
    readyHook,
    renderActorSheetHook,
    renderChatMessageHook,
    renderGamePauseHook,
    renderItemSheetHook,
    renderTokenHUDHook,
    updateCombatHook,
} from "./hooks.ts";
import { onScaleNPCContextHook } from "./feature/cr-scaler/NPCScalerSetup.ts";
import {
    addHeroPoints,
    calcRemainingMinutes,
    callHeroPointHandler,
    createRemainingTimeMessage,
    resetHeroPoints,
    startTimer,
} from "./feature/heroPointHandler/index.ts";
import { moveSelectedAheadOfCurrent } from "./feature/initiativeHandler/index.ts";
import { doMystificationFromToken } from "./feature/tokenMystificationHandler/index.ts";
import { autoRollDamage, noOrSuccessfulFlatcheck } from "./feature/damageHandler/index.ts";
import { registerWorkbenchSettings } from "./settings/index.ts";
import { mystifyNpcItemsByRarity } from "./feature/qolHandler/index.ts";
import { getAllFromAllowedPacks } from "./feature/api/getAllFromAllowedPacks.ts";

import { refocus } from "./feature/macros/refocus.ts";
import { followTheExpert } from "./feature/macros/follow-the-expert.ts";
import { hypercognition } from "./feature/macros/hypercognition.ts";
import { npcScaler } from "./feature/macros/npcScaler.ts";
import { initCanvasPointer } from "./feature/canvas-pointer/index.ts";
import { registerHandlebarsHelpers } from "./utils/handlebarsHelpers.ts";
import { registerToolbeltWrappers } from "./feature/damageHandler/toolbeltIntegration.ts";
import { MODULENAME } from "./constants.ts";

export const NPC_TYPE = "npc";
export const CHARACTER_TYPE = "character";

const activeHooks = new Set<string>();

// Enum for phases
export enum Phase {
    DOWN = 0, // Before init, not sure if it has a name in foundry
    INIT = 10,
    SETUP = 20,
    READY = 30,
    ACTIVE = 40, // After ready, not sure if it has a name in foundry
}

export let phase: Phase = Phase.DOWN;

function handle(
    hookName: string,
    shouldBeOn: unknown,
    hookFunction: (...args: unknown[]) => boolean | void | Promise<boolean | void>,
    once = false,
): void {
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

export function updateHooks(cleanSlate = false): void {
    if (phase > Phase.SETUP && game.user.isGM) {
        game.socket.emit("module." + MODULENAME, { operation: "updateHooks" });
    }
    if (cleanSlate) {
        activeHooks.clear();
    }

    const autoRollDamageAllow = getModuleSetting<string>("autoRollDamageAllow");
    const experimentalToolbeltSaveIntegration = getModuleSetting<boolean>("experimentalToolbeltSaveIntegration");
    const autoRollDamageForStrike = getModuleSetting<boolean>("autoRollDamageForStrike");
    const autoRollDamageForSpellAttack = getModuleSetting<boolean>("autoRollDamageForSpellAttack");
    const autoRollDamageForSpellWhenNotAnAttack = getModuleSetting<string>("autoRollDamageForSpellWhenNotAnAttack");
    const castPrivateSpell = getModuleSetting<boolean>("castPrivateSpell");
    const reminderTargeting = getModuleSetting<string>("reminderTargeting");
    const reminderCannotAttack = getModuleSetting<string>("reminderCannotAttack");
    const applyPersistentDamage = getModuleSetting<boolean>("applyPersistentDamage");
    const applyPersistentHealing = getModuleSetting<boolean>("applyPersistentHealing");
    const reminderBreathWeapon = getModuleSetting<boolean>("reminderBreathWeapon");
    const autoGainDyingIfTakingDamageWhenAlreadyDying = getModuleSetting<string>(
        "autoGainDyingIfTakingDamageWhenAlreadyDying",
    );
    const autoCollapseItemChatCardContent = getModuleSetting<string>("autoCollapseItemChatCardContent");
    const autoCollapseItemActionChatCardContent = getModuleSetting<string>("autoCollapseItemActionChatCardContent");
    const autoCollapseItemAttackChatCardContent = getModuleSetting<string>("autoCollapseItemAttackChatCardContent");
    const autoExpandDamageRolls = getModuleSetting<string>("autoExpandDamageRolls");
    const heroPointRules = getModuleSetting<string>("heroPointRules");
    const npcScaler = getModuleSetting<boolean>("npcScaler");
    const npcRoller = getModuleSetting<boolean>("npcRoller");
    const dropHeldItemsOnBecomingUnconscious = getModuleSetting<boolean>("dropHeldItemsOnBecomingUnconscious");
    const housepatcher = getModuleSetting<string>("housepatcher");
    const decreaseFrightenedConditionEachTurn = getModuleSetting<boolean>("decreaseFrightenedConditionEachTurn");
    const actionsReminderAllow = getModuleSetting<string>("actionsReminderAllow");
    const autoReduceStunned = getModuleSetting<boolean>("autoReduceStunned");
    const npcMystifier = getModuleSetting<boolean>("npcMystifier");
    const enableAutomaticMove = getModuleSetting<string>("enableAutomaticMove");
    const autoGainDyingAtZeroHP = getModuleSetting<string>("autoGainDyingAtZeroHP");
    const nonLethalIsNotLethal = getModuleSetting<string>("nonLethalIsNotLethal");
    const autoRemoveDyingAtGreaterThanZeroHP = getModuleSetting<string>("autoRemoveDyingAtGreaterThanZeroHP");
    const autoRemoveUnconsciousAtGreaterThanZeroHP = getModuleSetting<boolean>(
        "autoRemoveUnconsciousAtGreaterThanZeroHP",
    );
    const npcMystifyAllPhysicalMagicalItems = getModuleSetting<string>("npcMystifyAllPhysicalMagicalItems");
    const tokenAnimation = getModuleSetting<boolean>("tokenAnimation");
    const playerFeatsRarityColour = getModuleSetting<boolean>("playerFeatsRarityColour");
    const playerFeatsPrerequisiteHint = getModuleSetting<boolean>("playerFeatsPrerequisiteHint");
    const playerSpellsRarityColour = getModuleSetting<boolean>("playerSpellsRarityColour");
    const playerAbcdRarityColour = getModuleSetting<boolean>("playerAbcdRarityColour");
    const playerSpellsChangeSendToChat = getModuleSetting<boolean>("playerSpellsChangeSendToChat");
    const sheatheHeldItemsAfterEncounter = getModuleSetting<boolean>("sheatheHeldItemsAfterEncounter");
    const showItemLicenseTags = getModuleSetting<boolean>("showItemLicenseTags");
    const showCharacterOglTag = getModuleSetting<boolean>("showCharacterOglTag");

    const handleDyingRecoveryRoll = getModuleSetting<boolean>("handleDyingRecoveryRoll");
    const giveWoundedWhenDyingRemoved = getModuleSetting<boolean>("giveWoundedWhenDyingRemoved");
    const giveUnconsciousIfDyingRemovedAt0HP = getModuleSetting<boolean>("giveUnconsciousIfDyingRemovedAt0HP");

    handle("getActorContextOptions", npcScaler, onScaleNPCContextHook);
    handle("renderJournalDirectory", npcRoller, enableNpcRollerButton);
    handle("controlToken", npcRoller, NpcRoller.onControlToken);

    handle(
        "preCreateChatMessage",
        castPrivateSpell ||
            reminderTargeting !== "no" ||
            reminderCannotAttack === "cancelAttack" ||
            applyPersistentDamage ||
            applyPersistentHealing,
        preCreateChatMessageHook,
    );

    handle(
        "createChatMessage",
        (autoRollDamageAllow &&
            (autoRollDamageForStrike ||
                autoRollDamageForSpellAttack ||
                autoRollDamageForSpellWhenNotAnAttack !== "no")) ||
            reminderBreathWeapon ||
            reminderCannotAttack === "reminder" ||
            !autoGainDyingIfTakingDamageWhenAlreadyDying.startsWith("no"),
        createChatMessageHook,
    );

    const toolbeltSaveSpellActive =
        experimentalToolbeltSaveIntegration &&
        autoRollDamageAllow &&
        ["saveSpell", "anySpell"].includes(autoRollDamageForSpellWhenNotAnAttack) &&
        !!game.modules.get("pf2e-toolbelt")?.active;

    handle("pf2e-toolbelt.rollSave", toolbeltSaveSpellActive, pf2eToolbeltRollSaveHook);

    handle("combatStart", toolbeltSaveSpellActive, combatStartHook);
    handle("updateCombat", toolbeltSaveSpellActive, updateCombatHook);
    handle("deleteCombat", sheatheHeldItemsAfterEncounter || toolbeltSaveSpellActive, deleteCombatHook);

    handle("renderTokenHUD", npcMystifier, renderTokenHUDHook);

    handle(
        "renderChatMessageHTML",
        castPrivateSpell ||
            ["collapsedDefault", "nonCollapsedDefault"].includes(autoCollapseItemChatCardContent) ||
            ["collapsedDefault", "nonCollapsedDefault"].includes(autoCollapseItemActionChatCardContent) ||
            ["collapsedDefault", "nonCollapsedDefault"].includes(autoCollapseItemAttackChatCardContent) ||
            ["expandedAll", "expandedNew", "expandedNewest"].includes(autoExpandDamageRolls) ||
            handleDyingRecoveryRoll /* Deprecated */ ||
            heroPointRules !== "no",
        renderChatMessageHook,
    );

    handle("preCreateItem", dropHeldItemsOnBecomingUnconscious, preCreateItemHook);

    handle("deleteItem", giveWoundedWhenDyingRemoved || giveUnconsciousIfDyingRemovedAt0HP, deleteItemHook);

    handle("pf2e.systemReady", housepatcher !== "", pf2eSystemReadyHook, true);

    handle("pf2e.endTurn", decreaseFrightenedConditionEachTurn, pf2eEndTurnHook);

    handle("pf2e.startTurn", actionsReminderAllow !== "none" || autoReduceStunned, pf2eStartTurnHook);

    handle(
        "pf2e.reroll",
        heroPointRules === "keeleysHeroPointRule" ||
            heroPointRules === "useHighestHeroPointRoll" ||
            heroPointRules === "heroicRerolls",
        pf2eRerollHook,
    );

    handle("renderTokenHUD", npcMystifier, renderTokenHUDHook);

    handle(
        "preUpdateActor",
        enableAutomaticMove.startsWith("reaching0HP") ||
            !autoGainDyingAtZeroHP.startsWith("no") ||
            !nonLethalIsNotLethal.startsWith("no") ||
            !autoRemoveDyingAtGreaterThanZeroHP.startsWith("no") ||
            autoRemoveUnconsciousAtGreaterThanZeroHP ||
            (systems.getSystemSetting<boolean>("automation", "lootableNPCs") &&
                npcMystifyAllPhysicalMagicalItems === "onZeroHp"),
        preUpdateActorHook,
    );

    handle("preUpdateToken", tokenAnimation, preUpdateTokenHook);

    handle(
        "createToken",
        npcMystifier ||
            (systems.getSystemSetting<boolean>("automation", "lootableNPCs") &&
                npcMystifyAllPhysicalMagicalItems === "onScene"),
        createTokenHook,
    );

    handle(
        "renderActorSheet",
        playerFeatsRarityColour ||
            playerFeatsPrerequisiteHint ||
            playerSpellsRarityColour ||
            playerAbcdRarityColour ||
            castPrivateSpell ||
            playerSpellsChangeSendToChat ||
            showCharacterOglTag,
        renderActorSheetHook,
    );

    handle("renderItemSheet", showItemLicenseTags, renderItemSheetHook);

    const customPauseImage = getModuleSetting<string>("customPauseImage");
    const customPauseText = getModuleSetting<string>("customPauseText");
    const pauseImageNoSpin = getModuleSetting<boolean>("pauseImageNoSpin");
    handle(
        "renderGamePause",
        customPauseImage !== "" || customPauseText !== "" || pauseImageNoSpin,
        renderGamePauseHook,
    );

    handle(
        "ready",
        getModuleSetting<boolean>("legacyVariantRuleAncestryParagon") ||
            getModuleSetting<boolean>("legacyVariantRuleDualClass"),
        readyHook,
        true,
    );
}

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    logInfo(`${MODULENAME} | Initializing xdy-pf2e-workbench`);
    phase = Phase.INIT;

    registerWorkbenchSettings();
    registerWorkbenchKeybindings();

    await preloadTemplates();
    fireAndForget(registerNpcRollerHandlebarsTemplates(), "registerNpcRollerHandlebarsTemplates");

    fireAndForget(registerBasicActionMacrosHandlebarsTemplates(), "registerBasicActionMacrosHandlebarsTemplates");

    registerHandlebarsHelpers();

    initCanvasPointer();

    // Hooks that always run
    // None currently

    // Hooks that run once, if a setting is enabled. Manual refresh will still be needed for these.

    // Hooks that only run if a setting that needs it has been enabled
    updateHooks();

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    logInfo(`${MODULENAME} | Setting up`);
    phase = Phase.SETUP;
    // Do anything after initialization but before ready

    // General module setup
});

// When ready
Hooks.once("ready", () => {
    // Do anything once the module is ready
    logInfo(`${MODULENAME} | Ready`);
    phase = Phase.READY;

    // Must be in ready

    // Make some functions available for macros
    // noinspection UnnecessaryLocalVariableJS,JSUnusedGlobalSymbols
    const api = {
        resetHeroPoints: resetHeroPoints, // game.PF2eWorkbench.resetHeroPoints(1)
        addHeroPoints: addHeroPoints, // game.PF2eWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
        scaleNPCToLevelFromActor: scaleNPCToLevelFromActor, // game.PF2eWorkbench.scaleNPCToLevelFromActor(_token.actor.id, 24);
        moveSelectedAheadOfCurrent: moveSelectedAheadOfCurrent, // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantsByToken(_token.id)[0].id)
        doMystificationFromToken: doMystificationFromToken, // await game.PF2eWorkbench.doMystificationFromToken(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromToken(_token.id, false)
        generateNameFromTraitsFromTokenId: generateNameFromTraitsForToken, // await game.PF2eWorkbench.generateNameFromTraitsFromTokenId(_token.id)
        noOrSuccessfulFlatcheck: noOrSuccessfulFlatcheck, // await game.PF2eWorkbench.noOrSuccessfulFlatcheck(game.messages.get("messageId"))
        basicActionMacros: basicActionMacros, // await game.PF2eWorkbench.basicActionMacros()
        refocus: refocus, // await game.PF2eWorkbench.refocus()
        followTheExpert: followTheExpert, // await game.PF2eWorkbench.followTheExpert()
        hypercognition: hypercognition, // await game.PF2eWorkbench.followTheExpert()
        buildNpcSpellbookJournal: buildNpcSpellbookJournal, // await game.PF2eWorkbench.buildNpcSpellbookJournal()
        callHeroPointHandler: callHeroPointHandler, // await game.PF2eWorkbench.callHeroPointHandler()
        mystifyNpcItemsByRarity: mystifyNpcItemsByRarity, // await game.PF2eWorkbench.mystifyNpcItemsByRarity(actor, usingPartyLevel?, thresholds?)
        getAllFromAllowedPacks: getAllFromAllowedPacks, // await game.PF2eWorkbench.getAllFromAllowedPacks({ type, fields, filter, strictSourcing, fetch})
        npcScaler: npcScaler, // await game.PF2eWorkbench.npcScaler()
        autoRollDamage: autoRollDamage, // await game.PF2eWorkbench.autoRollDamage(message)
    };
    // @ts-expect-error Adding new field to game global
    game.PF2eWorkbench = api;
    // @ts-expect-error Adding new field to game global
    console.debug(`${MODULENAME} | game.PF2eWorkbench registered`, !!game.PF2eWorkbench);

    const autoRollSpell = getModuleSetting<string>("autoRollDamageForSpellWhenNotAnAttack");
    if (game.modules.get("pf2e-toolbelt")?.active && (autoRollSpell === "anySpell" || autoRollSpell === "saveSpell")) {
        registerToolbeltWrappers();
    }

    if (game.modules.get("pf2e-sheet-skill-actions")?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.pf2e-sheet-skill-actions`));
    }

    if (game.modules.get("pf2e-toolbox")?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.pf2e-toolbox`));
    }

    const ta = getModuleSetting<boolean>("tokenAnimation");
    const mlt = game.modules.get("multilevel-tokens");
    if (ta && mlt?.active) {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.modules.multilevel-tokens`));
    }

    updateHooks();

    // TODO Instead of opening immediately, add a handler that hooks onto the *first* unpause, and starts then.
    // TODO Check if more than 'timer max' minutes have passed, if so assume new start and reset to 'timer max' minutes.
    if (isFirstGM() && getModuleSetting<boolean>("heroPointHandler")) {
        let remainingMinutes = calcRemainingMinutes(false);
        if (remainingMinutes > 0 || getModuleSetting<boolean>("heroPointHandlerStartTimerOnReady")) {
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

    phase = Phase.ACTIVE;
    Hooks.callAll(`${MODULENAME}.moduleReady`);
});
