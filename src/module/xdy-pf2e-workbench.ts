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
import {
    doMystificationFromToken,
    mangleChatMessage,
    renderNameHud,
    tokenCreateMystification,
} from "./feature/tokenMystificationHandler";
import { registerWorkbenchKeybindings } from "./keybinds";
import { autoRollDamage, noOrSuccessfulFlatcheck, persistentDamage, persistentHealing } from "./feature/damageHandler";
import { moveOnZeroHP, moveSelectedAheadOfCurrent } from "./feature/initiativeHandler";
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { toggleMenuSettings, toggleSettings } from "./feature/settingsHandler";
import {
    addGmRKButtonToNpc,
    castPrivateSpell,
    chatCardDescriptionCollapse,
    damageCardExpand,
} from "./feature/qolHandler";
import {
    addHeroPoints,
    calcRemainingMinutes,
    createRemainingTimeMessage,
    maxHeroPoints,
    resetHeroPoints,
    startTimer,
} from "./feature/heroPointHandler";
import { isActuallyDamageRoll, isFirstGM } from "./utils";
import { ItemPF2e, PhysicalItemPF2e } from "@item";
import { onQuantitiesHook } from "./feature/quickQuantities";
import {
    actionsReminder,
    autoReduceStunned,
    reminderBreathWeapon,
    reminderCannotAttack,
    reminderIWR,
    reminderTargeting,
} from "./feature/reminders";
import { setupNPCScaler } from "./feature/cr-scaler/NPCScalerSetup";
import { setupCreatureBuilder } from "./feature/creature-builder/CreatureBuilder";
import { setupNpcRoller } from "./feature/npc-roller/NpcRoller";
import { SettingsMenuPF2eWorkbench } from "./settings/menu";
import { ChatMessageDataPF2e } from "@module/chat-message/data";
import { UserPF2e } from "@module/user";
import {
    loadSkillActions,
    loadSkillActionsBabele,
    renderSheetSkillActions,
} from "./feature/skill-actions/sheet-skill-actions";
import { scaleNPCToLevelFromActor } from "./feature/cr-scaler/NPCScaler";
import { generateNameFromTraitsForToken } from "./feature/tokenMystificationHandler/traits-name-generator";
import {
    applyClumsyIfWieldingLargerWeapon,
    applyEncumbranceBasedOnBulk,
    autoRemoveUnconsciousAtGreaterThanZeroHP,
    giveUnconsciousIfDyingRemovedAt0HP,
    giveWoundedWhenDyingRemoved,
    increaseDyingOnZeroHP,
    reduceFrightened,
    removeDyingOnZeroHP,
} from "./feature/conditionHandler";
import { TokenDocumentPF2e } from "@scene";
import { basicActionMacros } from "./feature/macros/basicActionMacros";
import { refocus } from "./feature/macros/refocus";

export const MODULENAME = "xdy-pf2e-workbench";

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerWorkbenchSettings();

    await preloadTemplates();

    registerHandlebarsHelpers();

    // Hooks that always run
    Hooks.on("renderSettingsMenuPF2eWorkbench", (_app: any, html: JQuery, _settings: SettingsMenuPF2eWorkbench) => {
        toggleMenuSettings(html, _settings);
    });

    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        toggleSettings(html);
    });

    // Hooks that only run if a setting that needs it has been enabled
    if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
        Hooks.once("babele.ready", async () => {
            if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
                loadSkillActionsBabele();
            }
        });
    }

    if (game.settings.get(MODULENAME, "castPrivateSpell")) {
        Hooks.on(
            "preCreateChatMessage",
            async (message: ChatMessagePF2e, data: ChatMessageDataPF2e, _options, _user: UserPF2e) => {
                if (
                    game.settings.get(MODULENAME, "castPrivateSpell") &&
                    message.flags.pf2e?.casting?.id &&
                    (game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL) ||
                        (message.actor?.type === "npc" &&
                            game.settings.get(MODULENAME, "castPrivateSpellAlwaysForNPC")))
                ) {
                    await castPrivateSpell(data, message);
                }
            }
        );
    }

    if (
        game.settings.get(MODULENAME, "autoRollDamageAllow") ||
        game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
        game.settings.get(MODULENAME, "autoRollDamageForSpellAttack") ||
        game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack") ||
        game.settings.get(MODULENAME, "automatedAnimationOn") ||
        game.settings.get(MODULENAME, "reminderBreathWeapon") ||
        game.settings.get(MODULENAME, "reminderTargeting") ||
        game.settings.get(MODULENAME, "reminderIWR") ||
        game.settings.get(MODULENAME, "reminderCannotAttack")
    ) {
        Hooks.on("createChatMessage", (message: ChatMessagePF2e) => {
            if (game.settings.get(MODULENAME, "reminderCannotAttack")) {
                reminderCannotAttack(message);
            }

            if (game.settings.get(MODULENAME, "reminderTargeting")) {
                reminderTargeting(message);
            }

            if (!isActuallyDamageRoll(message)) {
                if (
                    game.settings.get(MODULENAME, "autoRollDamageAllow") &&
                    (game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
                        game.settings.get(MODULENAME, "autoRollDamageForSpellAttack") ||
                        game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack"))
                ) {
                    autoRollDamage(message).then();
                }

                if (game.settings.get(MODULENAME, "reminderBreathWeapon")) {
                    reminderBreathWeapon(message).then();
                }
            } else {
                if (game.settings.get(MODULENAME, "reminderIWR")) {
                    reminderIWR(message).then();
                }
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNewest" ||
        game.settings.get(MODULENAME, "applyPersistentHealing") ||
        game.settings.get(MODULENAME, "applyPersistentDamage") ||
        (game.settings.get(MODULENAME, "npcMystifier") &&
            game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat"))
    ) {
        Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
                mangleChatMessage(message, html);
            }

            if (game.settings.get(MODULENAME, "applyPersistentHealing")) {
                persistentHealing(message).then();
            }

            if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
                persistentDamage(message).then();
            }

            if (isActuallyDamageRoll(message)) {
                if (
                    game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll" ||
                    game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew" ||
                    game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNewest"
                ) {
                    damageCardExpand(message, html);
                }
            } else {
                if (
                    game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
                    game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault"
                ) {
                    chatCardDescriptionCollapse(html);
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
        Hooks.on("createItem", async (item: ItemPF2e, _options: {}, _id: any) => {
            if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                applyEncumbranceBasedOnBulk(item);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk") ||
        game.settings.get(MODULENAME, "applyClumsyIfWieldingLargerWeapon")
    ) {
        Hooks.on("updateItem", async (item: ItemPF2e, update: any) => {
            if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                applyEncumbranceBasedOnBulk(item);
            }
            if (game.settings.get(MODULENAME, "applyClumsyIfWieldingLargerWeapon")) {
                applyClumsyIfWieldingLargerWeapon(item, update);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk") ||
        game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
        game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")
    ) {
        Hooks.on("deleteItem", async (item: ItemPF2e, _options: {}) => {
            if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                applyEncumbranceBasedOnBulk(item);
            }

            if (
                game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
                game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")
            ) {
                if (game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved")) {
                    giveWoundedWhenDyingRemoved(item).then(() => {
                        console.log("Workbench giveWoundedWhenDyingRemoved complete");
                        if (game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")) {
                            giveUnconsciousIfDyingRemovedAt0HP(item).then(() => {
                                console.log("Workbench giveUnconsciousIfDyingRemovedAt0HP complete");
                            });
                        }
                    });
                } else if (game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")) {
                    await giveUnconsciousIfDyingRemovedAt0HP(item);
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        Hooks.on("pf2e.endTurn", (combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string) => {
            if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
                reduceFrightened(combatant, userId).then(() => console.log("Workbench reduceFrightened complete"));
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "actionsReminderAllow") !== "none" ||
        game.settings.get(MODULENAME, "autoReduceStunned")
    ) {
        Hooks.on("pf2e.startTurn", async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            const forWhom = game.settings.get(MODULENAME, "actionsReminderAllow");
            if (game.settings.get(MODULENAME, "autoReduceStunned")) {
                autoReduceStunned(combatant).then((reduction) => {
                    if (forWhom !== "none") {
                        actionsReminder(combatant, reduction);
                    }
                });
            } else if (forWhom !== "none") {
                actionsReminder(combatant, 0);
            }
        });
    }

    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("renderTokenHUD", (_app, html: JQuery, data: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                renderNameHud(data, html);
            }
        });
    }
    if (game.settings.get(MODULENAME, "maxHeroPoints") !== 3) {
        Hooks.on("renderCharacterSheetPF2e", (app: TokenHUD, html: JQuery, data: any) => {
            if (game.settings.get(MODULENAME, "maxHeroPoints") !== 3) {
                maxHeroPoints(app, html, data);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP" ||
        game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none" ||
        game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none" ||
        game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")
    ) {
        Hooks.on("preUpdateActor", async (actor: ActorPF2e, update: Record<string, string>) => {
            const hp = actor.system.attributes.hp?.value || 0;
            if (game.combat && game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP") {
                moveOnZeroHP(actor, deepClone(update), hp).then();
            }

            if (game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none") {
                increaseDyingOnZeroHP(actor, deepClone(update), hp).then(() => {
                    console.log("Workbench increaseDyingOnZeroHP complete");
                    if (game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none") {
                        // Ugh.
                        new Promise((resolve) => setTimeout(resolve, 250)).then(() => {
                            removeDyingOnZeroHP(actor, deepClone(update), hp).then(() => {
                                console.log("Workbench autoRemoveDyingAtGreaterThanZeroHP complete");
                                if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                                    autoRemoveUnconsciousAtGreaterThanZeroHP(actor, deepClone(update), hp).then();
                                }
                            });
                        });
                    } else {
                        if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                            autoRemoveUnconsciousAtGreaterThanZeroHP(actor, deepClone(update), hp).then();
                        }
                    }
                });
            } else {
                if (game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none") {
                    removeDyingOnZeroHP(actor, deepClone(update), hp).then(() => {
                        if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                            autoRemoveUnconsciousAtGreaterThanZeroHP(actor, deepClone(update), hp).then();
                        }
                    });
                } else {
                    if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                        autoRemoveUnconsciousAtGreaterThanZeroHP(actor, deepClone(update), hp).then();
                    }
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "tokenAnimation")) {
        Hooks.on("preUpdateToken", (_document, update, options, ..._args) => {
            if (game.settings.get(MODULENAME, "tokenAnimation") && (update.x || update.y)) {
                setProperty(options, "animation", {
                    movementSpeed: game.settings.get(MODULENAME, "tokenAnimationSpeed"),
                });
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "npcMystifier") ||
        (game.settings.get("pf2e", "automation.lootableNPCs") &&
            game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems"))
    ) {
        Hooks.on("createToken", async (token: TokenDocumentPF2e, ..._args) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                tokenCreateMystification(token).then();
            }

            if (
                game.user?.isGM &&
                game.settings.get("pf2e", "automation.lootableNPCs") &&
                game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") &&
                token.actor &&
                token.actor.type === "npc"
            ) {
                const actor = token.actor;
                const items: PhysicalItemPF2e[] = <PhysicalItemPF2e[]>Array.from(
                    actor.items
                        .filter((item) =>
                            ["armor", "backpack", "book", "consumable", "equipment", "treasure", "weapon"].includes(
                                item.type
                            )
                        )
                        .map((item) => <PhysicalItemPF2e>(<unknown>item))
                        .filter((item) => !item.isTemporary)
                        .filter((item) => {
                            return item.identificationStatus === "identified";
                        })
                        .filter((item) => item.isMagical || item.isAlchemical)
                );

                for (const item of items ?? []) {
                    await actor?.items?.get(item.id)?.update({
                        "system.identification.status": "unidentified",
                        "system.identification.unidentified": item.getMystifiedData("unidentified"),
                    });
                }
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "playerItemsRarityColour") ||
        game.settings.get(MODULENAME, "castPrivateSpell") ||
        game.settings.get(MODULENAME, "addGmRKButtonToNpc") ||
        game.settings.get(MODULENAME, "quickQuantities") ||
        game.settings.get(MODULENAME, "skillActions") !== "disabled"
    ) {
        Hooks.on("renderActorSheet", (sheet: ActorSheet, $html: JQuery) => {
            if (game.settings.get(MODULENAME, "quickQuantities")) {
                onQuantitiesHook(sheet, $html);
            }

            if (game.settings.get(MODULENAME, "castPrivateSpell")) {
                $html.find(".cast-spell").each((_i, e) => {
                    const $e = $(e);
                    $e.addClass(`xdy-pf2e-workbench-secret-spell`);
                });
            }

            if (game.settings.get(MODULENAME, "playerItemsRarityColour")) {
                $html.find(".item").each((_i, e) => {
                    $(e).each((_i, e) => {
                        const rarity = $(e).attr("data-item-rarity");
                        const mystified = $(e).find("span").hasClass("gm-mystified-data");
                        if (rarity && !mystified) {
                            $(e).find("h4").addClass(`xdy-pf2e-workbench-rarity-${rarity}`);
                        }
                    });
                });
            }

            if (game.user?.isGM && game.settings.get(MODULENAME, "addGmRKButtonToNpc")) {
                addGmRKButtonToNpc($html, sheet);
            }
            if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
                renderSheetSkillActions(sheet, $html);
            }
        });
    }

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready

    if (game.settings.get(MODULENAME, "customPauseImage") !== "") {
        // Set css variables for the module
        document.documentElement.style.setProperty(
            "--xdy-pf2e-workbench-pause",
            "url(../../../" + <string>game.settings.get(MODULENAME, "customPauseImage") + ")"
        );
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

    if (game.settings.get(MODULENAME, "npcScaler")) {
        setupNPCScaler();
    }

    if (game.settings.get(MODULENAME, "creatureBuilder")) {
        setupCreatureBuilder();
    }

    if (game.settings.get(MODULENAME, "npcRoller")) {
        await setupNpcRoller();
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
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(`${MODULENAME} | Ready`);

    // Must be in ready

    if (isFirstGM()) {
        await migrateFeatures();
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
    // @ts-ignore
    game.PF2eWorkbench = {
        resetHeroPoints: resetHeroPoints, // game.PF2eWorkbench.resetHeroPoints(1)
        addHeroPoints: addHeroPoints, // game.PF2eWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
        scaleNPCToLevelFromActor: scaleNPCToLevelFromActor, // await game.PF2eWorkbench.scaleNPCToLevelFromActor(_token.actor.id, 24);
        moveSelectedAheadOfCurrent: moveSelectedAheadOfCurrent, // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantByToken(_token.id).id)
        doMystificationFromToken: doMystificationFromToken, // await game.PF2eWorkbench.doMystificationFromToken(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromToken(_token.id, false)
        generateNameFromTraitsFromTokenId: generateNameFromTraitsForToken, // await game.PF2eWorkbench.generateNameFromTraitsFromTokenId(_token.id)
        noOrSuccessfulFlatcheck: noOrSuccessfulFlatcheck, // await game.PF2eWorkbench.noOrSuccessfulFlatcheck(game.messages.get("messageId"))
        basicActionMacros: basicActionMacros, // await game.PF2eWorkbench.basicActionMacros()
        refocus: refocus, // await game.PF2eWorkbench.refocus()
    };

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
        loadSkillActions();
    }

    // @ts-ignore
    // game.i18n.translations.GAME.Paused = game.settings.get(MODULENAME, "customPauseText");

    Hooks.callAll(`${MODULENAME}.moduleReady`);
});

function registerHandlebarsHelpers() {
    Handlebars.registerHelper("includes", function (array: any[], value: any, options: any) {
        if (array.includes(value)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("ifeq", function (v1, v2, options) {
        if (v1 === v2) return options.fn(this);
        else return options.inverse();
    });
    Handlebars.registerHelper("ifne", function (v1, v2, options) {
        if (v1 !== v2) return options.fn(this);
        else return options.inverse();
    });

    Handlebars.registerHelper("isNaN", function (context, options) {
        if (isNaN(context) && !(typeof context === "string")) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("undefined", function () {
        return undefined;
    });

    Handlebars.registerHelper("hasKey", function (context, key) {
        for (const prop of context) {
            if (Object.getOwnPropertyDescriptor(prop, key)) {
                return true;
            }
        }
        return false;
    });
}
