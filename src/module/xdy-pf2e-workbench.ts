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
import { ActorPF2e } from "foundry-pf2e";

import { handleAsync, isFirstGM, logInfo } from "./utils.js";
import * as systems from "./utils/systems.ts";
import {
    enableNpcRollerButton,
    NpcRoller,
    registerNpcRollerHandlebarsTemplates,
} from "./feature/npc-roller/NpcRoller.js";
import { scaleNPCToLevelFromActor } from "./feature/cr-scaler/NPCScaler.js";
import { generateNameFromTraitsForToken } from "./feature/tokenMystificationHandler/traits-name-generator.js";
import { basicActionMacros, registerBasicActionMacrosHandlebarsTemplates } from "./feature/macros/basicActionMacros.js";
import { buildNpcSpellbookJournal } from "./feature/macros/buildNpcSpellbookJournal.js";
import {
    createChatMessageHook,
    createTokenHook,
    deleteCombatHook,
    deleteItemHook,
    pf2eEndTurnHook,
    pf2eRerollHook,
    pf2eStartTurnHook,
    pf2eSystemReadyHook,
    preCreateChatMessageHook,
    preCreateItemHook,
    preUpdateActorHook,
    preUpdateTokenHook,
    renderActorSheetHook,
    renderChatMessageHook,
    renderTokenHUDHook,
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
import { autoRollDamage, noOrSuccessfulFlatcheck } from "./feature/damageHandler/index.js";
import { registerWorkbenchSettings } from "./settings/index.js";
import { mystifyNpcItems } from "./feature/qolHandler/index.js";
import { getAllFromAllowedPacks } from "./feature/api/getAllFromAllowedPacks.js";

import "../styles/xdy-pf2e-workbench.scss";
import { refocus } from "./feature/macros/refocus.js";
import { followTheExpert } from "./feature/macros/follow-the-expert.js";
import { hypercognition } from "./feature/macros/hypercognition.js";
import { npcScaler } from "./feature/macros/npcScaler.js";

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

export function updateHooks(cleanSlate = false): void {
    if (phase > Phase.SETUP && game.user.isGM) {
        game.socket.emit("module." + MODULENAME, { operation: "updateHooks" });
    }
    if (cleanSlate) {
        activeHooks.clear();
    }

    const gs = game.settings;

    const autoRollDamageAllow = gs.get(MODULENAME, "autoRollDamageAllow");
    const autoRollDamageForStrike = gs.get(MODULENAME, "autoRollDamageForStrike");
    const autoRollDamageForSpellAttack = gs.get(MODULENAME, "autoRollDamageForSpellAttack");
    const autoRollDamageForSpellWhenNotAnAttack = gs.get(MODULENAME, "autoRollDamageForSpellWhenNotAnAttack");
    const castPrivateSpell = gs.get(MODULENAME, "castPrivateSpell");
    const reminderTargeting = gs.get(MODULENAME, "reminderTargeting");
    const reminderCannotAttack = gs.get(MODULENAME, "reminderCannotAttack");
    const applyPersistentDamage = gs.get(MODULENAME, "applyPersistentDamage");
    const applyPersistentHealing = gs.get(MODULENAME, "applyPersistentHealing");
    const reminderBreathWeapon = gs.get(MODULENAME, "reminderBreathWeapon");
    const autoGainDyingIfTakingDamageWhenAlreadyDying = String(
        gs.get(MODULENAME, "autoGainDyingIfTakingDamageWhenAlreadyDying"),
    );
    const autoCollapseItemChatCardContent = String(gs.get(MODULENAME, "autoCollapseItemChatCardContent"));
    const autoCollapseItemActionChatCardContent = String(gs.get(MODULENAME, "autoCollapseItemActionChatCardContent"));
    const autoCollapseItemAttackChatCardContent = String(gs.get(MODULENAME, "autoCollapseItemAttackChatCardContent"));
    const autoExpandDamageRolls = String(gs.get(MODULENAME, "autoExpandDamageRolls"));
    const heroPointRules = gs.get(MODULENAME, "heroPointRules");
    const npcScaler = gs.get(MODULENAME, "npcScaler");
    const npcRoller = gs.get(MODULENAME, "npcRoller");
    const dropHeldItemsOnBecomingUnconscious = gs.get(MODULENAME, "dropHeldItemsOnBecomingUnconscious");
    const housepatcher = gs.get(MODULENAME, "housepatcher");
    const decreaseFrightenedConditionEachTurn = gs.get(MODULENAME, "decreaseFrightenedConditionEachTurn");
    const actionsReminderAllow = gs.get(MODULENAME, "actionsReminderAllow");
    const autoReduceStunned = gs.get(MODULENAME, "autoReduceStunned");
    const npcMystifier = gs.get(MODULENAME, "npcMystifier");
    const enableAutomaticMove = String(gs.get(MODULENAME, "enableAutomaticMove"));
    const autoGainDyingAtZeroHP = String(gs.get(MODULENAME, "autoGainDyingAtZeroHP"));
    const nonLethalIsNotLethal = String(gs.get(MODULENAME, "nonLethalIsNotLethal"));
    const autoRemoveDyingAtGreaterThanZeroHP = String(gs.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP"));
    const autoRemoveUnconsciousAtGreaterThanZeroHP = gs.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP");
    const npcMystifyAllPhysicalMagicalItems = gs.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems");
    const tokenAnimation = gs.get(MODULENAME, "tokenAnimation");
    const playerFeatsRarityColour = gs.get(MODULENAME, "playerFeatsRarityColour");
    const playerFeatsPrerequisiteHint = gs.get(MODULENAME, "playerFeatsPrerequisiteHint");
    const playerSpellsRarityColour = gs.get(MODULENAME, "playerSpellsRarityColour");
    const playerSpellsChangeSendToChat = gs.get(MODULENAME, "playerSpellsChangeSendToChat");
    const sheatheHeldItemsAfterEncounter = gs.get(MODULENAME, "sheatheHeldItemsAfterEncounter");

    const handleDyingRecoveryRoll = gs.get(MODULENAME, "handleDyingRecoveryRoll");
    const giveWoundedWhenDyingRemoved = gs.get(MODULENAME, "giveWoundedWhenDyingRemoved");
    const giveUnconsciousIfDyingRemovedAt0HP = gs.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP");

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

    handle(
        "renderChatMessage",
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
            castPrivateSpell ||
            playerSpellsChangeSendToChat,
        renderActorSheetHook,
    );

    handle("deleteCombat", sheatheHeldItemsAfterEncounter, deleteCombatHook);

    changePauseText();
}

// "renderGamePause" is the AppV2 equivalent to "renderPause", used in Foundry v13+
Hooks.on("renderGamePause", (_app, _html, _options) => {
    changePauseText();
});

Hooks.on("renderPause", (_app, _html, _options) => {
    changePauseText();
});

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    logInfo(`${MODULENAME} | Initializing xdy-pf2e-workbench`);
    phase = Phase.INIT;

    registerWorkbenchSettings();
    registerWorkbenchKeybindings();

    await preloadTemplates();
    handleAsync(registerNpcRollerHandlebarsTemplates(), "registerNpcRollerHandlebarsTemplates");

    handleAsync(registerBasicActionMacrosHandlebarsTemplates(), "registerBasicActionMacrosHandlebarsTemplates");

    registerHandlebarsHelpers();

    // Hooks that always run
    // None currently

    // Hooks that run once, if a setting is enabled. Manual refresh will still be needed for these.

    // Hooks that only run if a setting that needs it has been enabled
    updateHooks();

    // Register custom sheets (if any)
});

export function changePauseText(): void {
    function encode(text: string): string {
        try {
            const isEncoded = text !== decodeURIComponent(text);
            return isEncoded ? text : encodeURIComponent(text);
        } catch {
            // text contains a raw % sign
            return encodeURIComponent(text);
        }
    }

    if (!document?.querySelector("#pause")?.classList.contains("paused")) {
        return;
    }

    const style = document.documentElement.style;

    const imagePath = <string>game.settings.get(MODULENAME, "customPauseImage");

    if (imagePath !== "") {
        let url: string;
        if (/^https?:/i.test(imagePath)) {
            const imageUrl = new URL(imagePath);
            const strings = imageUrl.pathname.split("/");
            strings.forEach((str, index) => {
                strings[index] = encode(str);
            });
            imageUrl.pathname = strings.join("/");

            url = `url("${imageUrl}")`;
        } else {
            url = `url("../../../${encode(imagePath)}")`;
        }
        style.setProperty("--xdy-pf2e-workbench-pause", url);
    }

    if (phase >= Phase.READY) {
        const element = document.querySelector<HTMLElement>("#pause > figcaption");
        const pauseImage = document.querySelector("#pause > img");

        const text = <string>game.settings.get(MODULENAME, "customPauseText");

        if (text && element) {
            element.textContent = text;
        }

        if (game.settings.get(MODULENAME, "pauseImageNoSpin")) {
            pauseImage?.classList.remove("fa-spin");
        } else {
            pauseImage?.classList.add("fa-spin");
        }
    }
}

// Setup module
Hooks.once("setup", async () => {
    logInfo(`${MODULENAME} | Setting up`);
    phase = Phase.SETUP;
    // Do anything after initialization but before ready

    // General module setup
});

function handleCampaignFeatSection(): void {
    const legacyVariantRuleAncestryParagon = game.settings.get(MODULENAME, "legacyVariantRuleAncestryParagon");
    const legacyVariantRuleDualClass = game.settings.get(MODULENAME, "legacyVariantRuleDualClass");

    // Add campaign feat sections if enabled
    if (legacyVariantRuleDualClass || legacyVariantRuleAncestryParagon) {
        const campaignFeatSections = systems.getSetting<
            {
                id: string;
                label: string;
                supported: string[];
                slots: number[];
            }[]
        >("campaignFeatSections");
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

        systems.setSetting("campaignFeatSections", campaignFeatSections);
    }

    const campaignFeatSections = systems.getSetting<
        {
            id: string;
            label: string;
            supported: string[];
            slots: number[];
        }[]
    >("campaignFeatSections");
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
        systems.setSetting("campaignFeatSections", campaignFeatSections);
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
        systems.setSetting("campaignFeatSections", campaignFeatSections);
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
    // @ts-expect-error Adding new field to game global
    game.PF2eWorkbench = {
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
        mystifyNpcItems: mystifyNpcItems, // await game.PF2eWorkbench.mystifyNpcItems() OR await game.PF2eWorkbench.mystifyNpcItems(items, minimumRarity, usingPartyLevel, minimumLevel, multiplier)
        getAllFromAllowedPacks: getAllFromAllowedPacks, // await game.PF2eWorkbench.getAllFromAllowedPacks({ type, fields, filter, strictSourcing, fetch})
        npcScaler: npcScaler, // await game.PF2eWorkbench.npcScaler()
        autoRollDamage: autoRollDamage, // await await game.PF2eWorkbench.autoRollDamage(message)
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
            if (Object.hasOwn(prop, key)) {
                return true;
            }
        }
        return false;
    });
}
