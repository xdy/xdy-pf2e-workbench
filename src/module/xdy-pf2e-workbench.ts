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
import {
    addTargetsLocally,
    clearTargetsLocally,
    fireAndForget,
    getModuleSetting,
    isFirstGM,
    restoreTargetsLocally,
    saveTargetsLocally,
    selectCombatantLocally,
} from "./utils.js";
import { logInfo } from "./utils/logging.js";
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
    renderChatMessageHTMLHook,
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
import { registerSettingsFieldPartials } from "./settings/menu.ts";
import { mystifyNpcItemsByRarity } from "./feature/qolHandler/index.ts";
import { getAllFromAllowedPacks } from "./feature/api/getAllFromAllowedPacks.ts";

import { refocus } from "./feature/macros/refocus.ts";
import { followTheExpert } from "./feature/macros/follow-the-expert.ts";
import { hypercognition } from "./feature/macros/hypercognition.ts";
import { npcScaler } from "./feature/macros/npcScaler.ts";
import { initCanvasPointer } from "./feature/canvas-pointer/index.ts";
import { registerHandlebarsHelpers } from "./utils/handlebarsHelpers.ts";
import {
    isToolbeltIntegrationActive,
    registerToolbeltWrappers,
} from "./feature/damageHandler/toolbelt/toolbeltIntegration.ts";
import { MODULENAME } from "./constants.ts";
import { Phase, phase, setPhase } from "./lifecycle.ts";

export { Phase } from "./lifecycle.ts";

export const NPC_TYPE = "npc";
export const CHARACTER_TYPE = "character";

// Cached chat render settings  refreshed by updateHooks on every setting change
export const chatRenderSettings = {
    expandDamageRolls: "collapsedDefault",
    castPrivateSpell: false,
    collapseItemContent: "noCollapse",
    collapseItemAttackContent: "noCollapse",
    collapseItemActionContent: "noCollapse",
    heroPointRules: "no",
    handleDyingRecoveryRoll: false,
};

function refreshChatRenderSettings(s: Record<string, unknown>): void {
    chatRenderSettings.expandDamageRolls = String(s.autoExpandDamageRolls ?? "collapsedDefault");
    chatRenderSettings.castPrivateSpell = !!s.castPrivateSpell;
    chatRenderSettings.collapseItemContent = String(s.autoCollapseItemChatCardContent ?? "noCollapse");
    chatRenderSettings.collapseItemAttackContent = String(s.autoCollapseItemAttackChatCardContent ?? "noCollapse");
    chatRenderSettings.collapseItemActionContent = String(s.autoCollapseItemActionChatCardContent ?? "noCollapse");
    chatRenderSettings.heroPointRules = String(s.heroPointRules ?? "no");
    chatRenderSettings.handleDyingRecoveryRoll = !!s.handleDyingRecoveryRoll;
}

const activeHooks = new Set<string>();

type HookCondition = string | ((s: Record<string, unknown>) => boolean);

interface HookDef {
    hook: string;
    handler: (...args: unknown[]) => boolean | void | Promise<boolean | void>;
    condition: HookCondition;
    once?: boolean;
}

function evaluateCondition(def: HookCondition, s: Record<string, unknown>): boolean {
    if (typeof def === "function") return def(s);
    return !!s[def];
}

// Settings keys referenced by hook conditions, kept here for discoverability
const HOOK_DEFS: HookDef[] = [
    { hook: "getActorContextOptions", handler: onScaleNPCContextHook, condition: "npcScaler" },
    { hook: "renderJournalDirectory", handler: enableNpcRollerButton, condition: "npcRoller" },
    { hook: "controlToken", handler: NpcRoller.onControlToken, condition: "npcRoller" },
    {
        hook: "preCreateChatMessage",
        handler: preCreateChatMessageHook,
        condition: (s) =>
            !!s.castPrivateSpell ||
            s.reminderTargeting !== "no" ||
            s.reminderCannotAttack === "cancelAttack" ||
            !!s.applyPersistentDamage ||
            !!s.applyPersistentHealing,
    },
    {
        hook: "createChatMessage",
        handler: createChatMessageHook,
        condition: (s) =>
            (!!s.autoRollDamageAllow &&
                (!!s.autoRollDamageForStrike ||
                    !!s.autoRollDamageForSpellAttack ||
                    s.autoRollDamageForSpellWhenNotAnAttack !== "no")) ||
            !!s.reminderBreathWeapon ||
            s.reminderCannotAttack === "reminder" ||
            !String(s.autoGainDyingIfTakingDamageWhenAlreadyDying).startsWith("no"),
    },
    { hook: "pf2e-toolbelt.rollSave", handler: pf2eToolbeltRollSaveHook, condition: "toolbeltSaveSpellActive" },
    { hook: "combatStart", handler: combatStartHook, condition: "toolbeltSaveSpellActive" },
    { hook: "updateCombat", handler: updateCombatHook, condition: "toolbeltSaveSpellActive" },
    {
        hook: "deleteCombat",
        handler: deleteCombatHook,
        condition: (s) => !!s.sheatheHeldItemsAfterEncounter || !!s.toolbeltSaveSpellActive,
    },
    {
        hook: "renderChatMessageHTML",
        handler: renderChatMessageHTMLHook,
        condition: (s) =>
            !!s.castPrivateSpell ||
            ["collapsedDefault", "nonCollapsedDefault"].includes(String(s.autoCollapseItemChatCardContent)) ||
            ["collapsedDefault", "nonCollapsedDefault"].includes(String(s.autoCollapseItemActionChatCardContent)) ||
            ["collapsedDefault", "nonCollapsedDefault"].includes(String(s.autoCollapseItemAttackChatCardContent)) ||
            ["expandedAll", "expandedNew", "expandedNewest"].includes(String(s.autoExpandDamageRolls)) ||
            !!s.handleDyingRecoveryRoll ||
            s.heroPointRules !== "no",
    },
    {
        hook: "preCreateItem",
        handler: preCreateItemHook,
        condition: (s) => !!s.enableGeneralLearnSpell || !!s.dropHeldItemsOnBecomingUnconscious,
    },
    {
        hook: "deleteItem",
        handler: deleteItemHook,
        condition: (s) =>
            !!s.giveWoundedWhenDyingRemoved || !!s.giveUnconsciousIfDyingRemovedAt0HP,
    },
    { hook: "pf2e.systemReady", handler: pf2eSystemReadyHook, condition: (s) => s.housepatcher !== "", once: true },
    {
        hook: "pf2e.endTurn",
        handler: pf2eEndTurnHook,
        condition: (s) =>
            !!s.decreaseFrightenedConditionEachTurn ||
            !!s.clearCombatantTargetsOnTurnEnd ||
            !!s.rememberAndReaddCombatantTargets,
    },
    {
        hook: "pf2e.startTurn",
        handler: pf2eStartTurnHook,
        condition: (s) =>
            s.actionsReminderAllow !== "none" ||
            !!s.autoReduceStunned ||
            !!s.selectCurrentCombatantOnTurnStart ||
            !!s.rememberAndReaddCombatantTargets,
    },
    {
        hook: "pf2e.reroll",
        handler: pf2eRerollHook,
        condition: (s) =>
            s.heroPointRules === "keeleysHeroPointRule" ||
            s.heroPointRules === "useHighestHeroPointRoll" ||
            s.heroPointRules === "heroicRerolls",
    },
    { hook: "renderTokenHUD", handler: renderTokenHUDHook, condition: "npcMystifier" },
    {
        hook: "preUpdateActor",
        handler: preUpdateActorHook,
        condition: (s) =>
            String(s.enableAutomaticMove).startsWith("reaching0HP") ||
            !String(s.autoGainDyingAtZeroHP).startsWith("no") ||
            !String(s.nonLethalIsNotLethal).startsWith("no") ||
            !String(s.autoRemoveDyingAtGreaterThanZeroHP).startsWith("no") ||
            !!s.autoRemoveUnconsciousAtGreaterThanZeroHP ||
            (!!s.systemLootableNPCs && s.npcMystifyAllPhysicalMagicalItems === "onZeroHp"),
    },
    { hook: "preUpdateToken", handler: preUpdateTokenHook, condition: "tokenAnimation" },
    {
        hook: "createToken",
        handler: createTokenHook,
        condition: (s) =>
            !!s.npcMystifier || (!!s.systemLootableNPCs && s.npcMystifyAllPhysicalMagicalItems === "onScene"),
    },
    {
        hook: "renderActorSheet",
        handler: renderActorSheetHook,
        condition: (s) =>
            !!s.playerFeatsRarityColour ||
            !!s.playerFeatsPrerequisiteHint ||
            !!s.playerSpellsRarityColour ||
            !!s.playerAbcdRarityColour ||
            !!s.castPrivateSpell ||
            !!s.playerSpellsChangeSendToChat ||
            !!s.showCharacterOglTag ||
            !!s.enableGeneralLearnSpell,
    },
    {
        hook: "renderItemSheet",
        handler: renderItemSheetHook,
        condition: (s) => !!s.showItemLicenseTags,
    },
    {
        hook: "renderGamePause",
        handler: renderGamePauseHook,
        condition: (s) => s.customPauseImage !== "" || s.customPauseText !== "" || !!s.pauseImageNoSpin,
    },
    {
        hook: "ready",
        handler: readyHook,
        condition: (s) => !!s.legacyVariantRuleAncestryParagon || !!s.legacyVariantRuleDualClass,
        once: true,
    },
];

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

    const s: Record<string, unknown> = {};

    const settingKeys = [
        "actionsReminderAllow",
        "applyPersistentDamage",
        "applyPersistentHealing",
        "autoCollapseItemActionChatCardContent",
        "autoCollapseItemAttackChatCardContent",
        "autoCollapseItemChatCardContent",
        "autoExpandDamageRolls",
        "autoGainDyingAtZeroHP",
        "autoGainDyingIfTakingDamageWhenAlreadyDying",
        "autoReduceStunned",
        "autoRemoveDyingAtGreaterThanZeroHP",
        "autoRemoveUnconsciousAtGreaterThanZeroHP",
        "autoRollDamageAllow",
        "autoRollDamageForSpellAttack",
        "autoRollDamageForSpellWhenNotAnAttack",
        "autoRollDamageForStrike",
        "canvasPointer",
        "canvasPointerBroadcastInterval",
        "canvasPointerIcon",
        "canvasPointerPingMode",
        "canvasPointerPingSound",
        "canvasPointerPingVolume",
        "castPrivateSpell",
        "customPauseImage",
        "customPauseText",
        "decreaseFrightenedConditionEachTurn",
        "clearCombatantTargetsOnTurnEnd",
        "rememberAndReaddCombatantTargets",
        "selectCurrentCombatantOnTurnStart",
        "dropHeldItemsOnBecomingUnconscious",
        "enableAutomaticMove",
        "enableGeneralLearnSpell",
        "experimentalToolbeltSaveIntegration",
        "giveUnconsciousIfDyingRemovedAt0HP",
        "giveWoundedWhenDyingRemoved",
        "handleDyingRecoveryRoll",
        "heroPointRules",
        "housepatcher",
        "legacyVariantRuleAncestryParagon",
        "legacyVariantRuleDualClass",
        "nonLethalIsNotLethal",
        "npcMystifier",
        "npcMystifyAllPhysicalMagicalItems",
        "npcRoller",
        "npcScaler",
        "pauseImageNoSpin",
        "playerAbcdRarityColour",
        "playerCraftingRarityColour",
        "playerFeatsPrerequisiteHint",
        "playerFeatsRarityColour",
        "playerSpellsChangeSendToChat",
        "playerSpellsRarityColour",
        "reminderBreathWeapon",
        "reminderCannotAttack",
        "reminderTargeting",
        "sheatheHeldItemsAfterEncounter",
        "showCharacterOglTag",
        "showItemLicenseTags",
        "tokenAnimation",
    ];
    for (const key of settingKeys) {
        s[key] = game.settings.get(MODULENAME, key);
    }

    s.toolbeltSaveSpellActive = isToolbeltIntegrationActive();

    s.systemLootableNPCs = systems.getSystemSetting<boolean>("automation", "lootableNPCs");

    for (const reg of HOOK_DEFS) {
        handle(reg.hook, evaluateCondition(reg.condition, s), reg.handler, reg.once);
    }

    refreshChatRenderSettings(s);
}

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    logInfo(`${MODULENAME} | Initializing xdy-pf2e-workbench`);
    setPhase(Phase.INIT);

    registerWorkbenchSettings();
    registerWorkbenchKeybindings();

    await preloadTemplates();
    fireAndForget(registerNpcRollerHandlebarsTemplates(), "registerNpcRollerHandlebarsTemplates");

    fireAndForget(registerBasicActionMacrosHandlebarsTemplates(), "registerBasicActionMacrosHandlebarsTemplates");

    registerHandlebarsHelpers();
    registerSettingsFieldPartials();

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
    setPhase(Phase.SETUP);
    // Do anything after initialization but before ready

    // General module setup
});

// When ready
Hooks.once("ready", () => {
    // Do anything once the module is ready
    logInfo(`${MODULENAME} | Ready`);
    setPhase(Phase.READY);

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

    if (isToolbeltIntegrationActive()) {
        registerToolbeltWrappers();
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
            case "combatTurnStart":
                if (game.user.id === operation.targetUserId) {
                    if (getModuleSetting<boolean>("selectCurrentCombatantOnTurnStart")) {
                        selectCombatantLocally(operation.combatantId);
                    }
                    if (getModuleSetting<boolean>("rememberAndReaddCombatantTargets")) {
                        restoreTargetsLocally(operation.combatantId);
                    }
                }
                break;
            case "combatTurnEnd":
                if (game.user.id === operation.targetUserId) {
                    if (getModuleSetting<boolean>("rememberAndReaddCombatantTargets")) {
                        saveTargetsLocally(operation.combatantId);
                    }
                    if (getModuleSetting<boolean>("clearCombatantTargetsOnTurnEnd")) {
                        clearTargetsLocally();
                    }
                }
                break;
            case "addTargets":
                if (game.user.id === operation.targetUserId) {
                    addTargetsLocally(operation.tokenIds);
                }
                break;
            case "clearTargets":
                if (game.user.id === operation.targetUserId) {
                    clearTargetsLocally();
                }
                break;
            default:
                break;
        }
    });

    setPhase(Phase.ACTIVE);
    Hooks.callAll(`${MODULENAME}.moduleReady`);
});
