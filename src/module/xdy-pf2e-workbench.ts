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
import {
    addGmRKButtonToNpc,
    castPrivateSpell,
    chatActionCardDescriptionCollapse,
    chatAttackCardDescriptionCollapse,
    chatCardDescriptionCollapse,
    damageCardExpand,
    mystifyNpcItems,
} from "./feature/qolHandler";
import {
    addHeroPoints,
    calcRemainingMinutes,
    callHeroPointHandler,
    createRemainingTimeMessage,
    maxHeroPoints,
    resetHeroPoints,
    startTimer,
} from "./feature/heroPointHandler";
import { isActuallyDamageRoll, isFirstGM } from "./utils";
import { ItemPF2e } from "@item";
import { onQuantitiesHook } from "./feature/quickQuantities";
import {
    actionsReminder,
    autoReduceStunned,
    reminderBreathWeapon,
    reminderCannotAttack,
    reminderTargeting,
} from "./feature/reminders";
import { setupNPCScaler } from "./feature/cr-scaler/NPCScalerSetup";
import { setupCreatureBuilder } from "./feature/creature-builder/CreatureBuilder";
import { setupNpcRoller } from "./feature/npc-roller/NpcRoller";
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
    autoRemoveDyingAtGreaterThanZeroHp,
    autoRemoveUnconsciousAtGreaterThanZeroHP,
    giveUnconsciousIfDyingRemovedAt0HP,
    giveWoundedWhenDyingRemoved,
    increaseDyingOnZeroHP,
    reduceFrightened,
} from "./feature/conditionHandler";
import { TokenDocumentPF2e } from "@scene";
import { basicActionMacros } from "./feature/macros/basicActionMacros";
import { refocus } from "./feature/macros/refocus";
import { buildNpcSpellbookJournal } from "./feature/macros/buildNpcSpellbookJournal";
import { whirlwindStrike } from "./feature/macros/whirlwindStrike";
import { ActorSystemData } from "@actor/data/base";

export const MODULENAME = "xdy-pf2e-workbench";
const NPC_TYPE = "npc";
const CHARACTER_TYPE = "character";

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerWorkbenchSettings();

    await preloadTemplates();

    registerHandlebarsHelpers();

    // Hooks that always run
    // Hooks.on("renderSettingsMenuPF2eWorkbench", (_app: any, html: JQuery, _settings: SettingsMenuPF2eWorkbench) => {
    //     toggleMenuSettings(html, _settings);
    // });

    // Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
    //     toggleSettings(html);
    // });

    // Hooks that only run if a setting that needs it has been enabled
    if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
        Hooks.once("babele.ready", async () => {
            if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
                loadSkillActionsBabele().then();
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
                        (message.actor?.type === NPC_TYPE &&
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
            }
        });
    }

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
        Hooks.on("renderChatMessage", (message: ChatMessagePF2e, html: JQuery) => {
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
                if (
                    (game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent") === "collapsedDefault" ||
                        game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent") ===
                            "nonCollapsedDefault") &&
                    ["weapon", "melee", "spell"].includes(message.item?.type ?? "")
                ) {
                    chatAttackCardDescriptionCollapse(html);
                }
                if (
                    ((game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent") === "collapsedDefault" ||
                        game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent") ===
                            "nonCollapsedDefault") &&
                        !message.item) ||
                    message.item?.type === "action"
                ) {
                    chatActionCardDescriptionCollapse(html);
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
        Hooks.on("createItem", async (item: ItemPF2e, _options: {}, _id: any) => {
            if (item.actor?.isOfType(CHARACTER_TYPE) && game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                applyEncumbranceBasedOnBulk(item);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk") ||
        game.settings.get(MODULENAME, "applyClumsyIfWieldingLargerWeapon")
    ) {
        Hooks.on("updateItem", async (item: ItemPF2e, update: any) => {
            if (item.actor?.isOfType(CHARACTER_TYPE) && game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                applyEncumbranceBasedOnBulk(item);
            }
            if (
                item.actor?.isOfType(CHARACTER_TYPE) &&
                game.settings.get(MODULENAME, "applyClumsyIfWieldingLargerWeapon")
            ) {
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
            if (item.actor?.isOfType(CHARACTER_TYPE) && game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                applyEncumbranceBasedOnBulk(item);
            }

            if (
                game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
                game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")
            ) {
                if (game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved")) {
                    giveWoundedWhenDyingRemoved(item).then(() => {
                        console.debug("Workbench giveWoundedWhenDyingRemoved complete");
                        if (game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")) {
                            giveUnconsciousIfDyingRemovedAt0HP(item).then(() => {
                                console.debug("Workbench giveUnconsciousIfDyingRemovedAt0HP complete");
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
                reduceFrightened(combatant, userId).then(() => console.debug("Workbench reduceFrightened complete"));
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

            // TODO Handle removal of game.combats.active.combatant.defeated/unsetting of deathIcon (are those the same?) for combatants that are neither dying nor have 0 HP.
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
        (<string>game.settings.get(MODULENAME, "enableAutomaticMove")).startsWith("reaching0HP") ||
        game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none" ||
        game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none" ||
        game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP") ||
        (game.settings.get("pf2e", "automation.lootableNPCs") &&
            game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onZeroHp")
    ) {
        Hooks.on("preUpdateActor", async (actor: ActorPF2e, update: Record<string, string>) => {
            const currentActorHp = (<ActorSystemData>actor.system).attributes.hp?.value || 0;
            const updateHp = <number>getProperty(update, "system.attributes.hp.value");
            if (
                game.user?.isGM &&
                actor?.type === NPC_TYPE &&
                actor?.items?.size > 0 &&
                currentActorHp > 0 &&
                updateHp <= 0 &&
                game.settings.get("pf2e", "automation.lootableNPCs") &&
                game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onZeroHp"
            ) {
                await mystifyNpcItems(actor.items);
            }

            const automoveIfZeroHP =
                game.combat &&
                ((<string>game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HPCharactersOnly" &&
                    actor.type === CHARACTER_TYPE) ||
                    (<string>game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP" &&
                        [CHARACTER_TYPE, NPC_TYPE].includes(actor.type)));
            if (game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none") {
                increaseDyingOnZeroHP(actor, deepClone(update), currentActorHp, updateHp).then((hpRaisedAbove0) => {
                    console.log("Workbench increaseDyingOnZeroHP complete");
                    if (hpRaisedAbove0) {
                        if (game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none") {
                            // Ugh.
                            new Promise((resolve) => setTimeout(resolve, 250)).then(() => {
                                autoRemoveDyingAtGreaterThanZeroHp(actor, currentActorHp <= 0 && hpRaisedAbove0).then(
                                    () => {
                                        console.log("Workbench autoRemoveDyingAtGreaterThanZeroHP complete");
                                        if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                                            autoRemoveUnconsciousAtGreaterThanZeroHP(
                                                actor,
                                                currentActorHp <= 0 && hpRaisedAbove0
                                            ).then();
                                        }
                                    }
                                );
                            });
                        } else {
                            if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                                autoRemoveUnconsciousAtGreaterThanZeroHP(
                                    actor,
                                    currentActorHp <= 0 && hpRaisedAbove0
                                ).then();
                            }
                        }
                    } else {
                        if (automoveIfZeroHP) {
                            const newActorHp = (<ActorSystemData>actor.system).attributes.hp?.value || 0;
                            moveOnZeroHP(actor, newActorHp, newActorHp !== currentActorHp ? updateHp : 0);
                        }
                    }
                });
            } else {
                if (game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none") {
                    autoRemoveDyingAtGreaterThanZeroHp(actor, currentActorHp <= 0 && updateHp > 0).then(() => {
                        if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                            autoRemoveUnconsciousAtGreaterThanZeroHP(actor, currentActorHp <= 0 && updateHp > 0).then();
                        }
                    });
                } else {
                    if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                        autoRemoveUnconsciousAtGreaterThanZeroHP(actor, currentActorHp <= 0 && updateHp > 0).then();
                    }
                }

                if (automoveIfZeroHP) {
                    const newActorHp = (<ActorSystemData>actor.system).attributes.hp?.value || 0;
                    moveOnZeroHP(actor, newActorHp, updateHp);
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
            game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onScene")
    ) {
        Hooks.on("createToken", async (token: TokenDocumentPF2e, ..._args) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                tokenCreateMystification(token).then();
            }

            if (
                game.user?.isGM &&
                game.settings.get("pf2e", "automation.lootableNPCs") &&
                game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems") === "onScene" &&
                token.actor &&
                token.actor.isOfType(NPC_TYPE) &&
                token.actor.items &&
                token.actor.items.size > 0
            ) {
                await mystifyNpcItems(token.actor.items);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "playerFeatsRarityColour") ||
        game.settings.get(MODULENAME, "playerFeatsPrerequisiteHint") ||
        game.settings.get(MODULENAME, "playerSpellsRarityColour") ||
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

            if (
                game.user?.isGM &&
                sheet.actor?.type === NPC_TYPE &&
                game.settings.get(MODULENAME, "addGmRKButtonToNpc")
            ) {
                addGmRKButtonToNpc($html, sheet);
            }

            if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, "skillActions") !== "disabled") {
                renderSheetSkillActions(sheet, $html);
            }

            if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, "playerSpellsRarityColour")) {
                $html.find(".spell-list").each((_i, e) => {
                    $(e)
                        .find(".item.spell")
                        .each((_n, e) => {
                            const $e = $(e);
                            const itemId: string = <string>$e.attr("data-item-id");
                            const spell: any = sheet.actor?.items?.get(itemId);
                            if (spell) {
                                const rarity = spell.system.traits.rarity;
                                if (rarity) {
                                    $e.find("h4").addClass(`xdy-pf2e-workbench-rarity-${rarity}`);
                                }
                            }
                        });
                });
            }

            if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, "playerFeatsRarityColour")) {
                $html.find(".feats-pane").each((_i, e) => {
                    $(e)
                        .find(".feat-item")
                        .each((_n, e) => {
                            const $e = $(e);
                            const itemId: string = <string>$e.attr("data-item-id");
                            const feat: any = sheet.actor?.items?.get(itemId);
                            if (feat) {
                                const rarity = feat.system.traits.rarity;
                                if (rarity) {
                                    $e.find("h4").addClass(`xdy-pf2e-workbench-rarity-${rarity}`);
                                }
                            }
                        });
                });
            }

            if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, "playerFeatsPrerequisiteHint")) {
                $html.find(".feats-pane").each((_i, e) => {
                    $(e)
                        .find(".feat-item")
                        .each((_n, e) => {
                            const $e = $(e);
                            const itemId: string = <string>$e.attr("data-item-id");
                            const feat: any = sheet.actor?.items?.get(itemId);
                            if (feat) {
                                const prereqs = feat.system.prerequisites.value.length > 0;
                                if (prereqs) {
                                    $e.find("h4").append("*");
                                }
                            }
                        });
                });
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
