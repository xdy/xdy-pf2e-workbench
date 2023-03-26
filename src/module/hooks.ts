import { ChatMessageDataPF2e, ChatMessagePF2e } from "@module/chat-message";
import { UserPF2e } from "@module/user";
import {
    addGmRKButtonToNpc,
    castPrivateSpell,
    chatActionCardDescriptionCollapse,
    chatAttackCardDescriptionCollapse,
    chatCardDescriptionCollapse,
    damageCardExpand,
    hideNameOfPrivateSpell,
    mystifyNpcItems,
} from "./feature/qolHandler";
import {
    actionsReminder,
    autoReduceStunned,
    reminderBreathWeapon,
    reminderCannotAttack,
    reminderTargeting,
} from "./feature/reminders";
import { isActuallyDamageRoll } from "./utils";
import { autoRollDamage, persistentDamage, persistentHealing } from "./feature/damageHandler";
import { mangleNamesInChatMessage, renderNameHud, tokenCreateMystification } from "./feature/tokenMystificationHandler";
import { ItemPF2e } from "@item";
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
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { maxHeroPoints } from "./feature/heroPointHandler";
import { ActorPF2e } from "@actor";
import { ActorSystemData } from "@actor/data/base";
import { moveOnZeroHP } from "./feature/initiativeHandler";
import { TokenDocumentPF2e } from "@scene";
import { onQuantitiesHook } from "./feature/quickQuantities";
import { renderSheetSkillActions } from "./feature/skill-actions/sheet-skill-actions";
import { CHARACTER_TYPE, MODULENAME, NPC_TYPE } from "./xdy-pf2e-workbench";
import { enableCreatureBuilderButton } from "./feature/creature-builder/CreatureBuilder";

export const preCreateChatMessageHook = async (
    message: ChatMessagePF2e,
    data: ChatMessageDataPF2e,
    _options,
    _user: UserPF2e
) => {
    if (
        game.settings.get(MODULENAME, "castPrivateSpell") &&
        message.flags.pf2e?.casting?.id &&
        (game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL) ||
            (message.actor?.type === NPC_TYPE && game.settings.get(MODULENAME, "castPrivateSpellAlwaysForNPC")))
    ) {
        await castPrivateSpell(data, message);
    }
};

export const createChatMessageHook = (message: ChatMessagePF2e) => {
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
};

export const renderChatMessageHook = (message: ChatMessagePF2e, html: JQuery) => {
    if (
        game.settings.get(MODULENAME, "castPrivateSpell") &&
        message?.flags?.pf2e?.origin?.type === "spell" &&
        isActuallyDamageRoll(message)
    ) {
        hideNameOfPrivateSpell(message, html);
    }

    if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
        mangleNamesInChatMessage(message, html);
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
                game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent") === "nonCollapsedDefault") &&
            ["weapon", "melee", "spell"].includes(message.item?.type ?? "")
        ) {
            chatAttackCardDescriptionCollapse(html);
        }
        if (
            ((game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent") === "collapsedDefault" ||
                game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent") === "nonCollapsedDefault") &&
                !message.item) ||
            message.item?.type === "action"
        ) {
            chatActionCardDescriptionCollapse(html);
        }
    }
};

export const createItemHook = async (item: ItemPF2e, _options: {}, _id: any) => {
    if (item.actor?.isOfType(CHARACTER_TYPE) && game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
        applyEncumbranceBasedOnBulk(item);
    }
};

export const updateItemHook = async (item: ItemPF2e, update: any) => {
    if (item.actor?.isOfType(CHARACTER_TYPE) && game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
        applyEncumbranceBasedOnBulk(item);
    }
    if (item.actor?.isOfType(CHARACTER_TYPE) && game.settings.get(MODULENAME, "applyClumsyIfWieldingLargerWeapon")) {
        applyClumsyIfWieldingLargerWeapon(item, update);
    }
};

export const deleteItemHook = async (item: ItemPF2e, _options: {}) => {
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
};

export const pf2eEndTurnHook = (combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string) => {
    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        reduceFrightened(combatant, userId).then(() => console.debug("Workbench reduceFrightened complete"));
    }
};

export const pf2eStartTurnHook = async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
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
};

export const renderTokenHUDHook = (_app, html: JQuery, data: any) => {
    if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
        renderNameHud(data, html);
    }
};

export const renderCharacterSheetPF2eHook = (app: TokenHUD, html: JQuery, data: any) => {
    if (game.settings.get(MODULENAME, "maxHeroPoints") !== 3) {
        maxHeroPoints(app, html, data);
    }
};

export const preUpdateActorHook = async (actor: ActorPF2e, update: Record<string, string>) => {
    const updateHp = getProperty(update, "system.attributes.hp.value");

    // All these are only relevant if hp has changed (it's undefined otherwise)
    if (typeof updateHp === "number") {
        const currentActorHp = (<ActorSystemData>actor.system).attributes.hp?.value || 0;
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
            if (updateHp > 0) {
                if (game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none") {
                    autoRemoveDyingAtGreaterThanZeroHp(actor, currentActorHp <= 0).then(() => {
                        if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                            autoRemoveUnconsciousAtGreaterThanZeroHP(actor, currentActorHp <= 0).then();
                        }
                    });
                } else {
                    if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                        autoRemoveUnconsciousAtGreaterThanZeroHP(actor, currentActorHp <= 0).then();
                    }
                }
            } else if (automoveIfZeroHP) {
                const newActorHp = (<ActorSystemData>actor.system).attributes.hp?.value || 0;
                moveOnZeroHP(actor, newActorHp, updateHp);
            }
        }
    }
};
export const preUpdateTokenHook = (_document, update, options, ..._args) => {
    if (game.settings.get(MODULENAME, "tokenAnimation") && (update.x || update.y)) {
        setProperty(options, "animation", {
            movementSpeed: game.settings.get(MODULENAME, "tokenAnimationSpeed"),
        });
    }
};

export const createTokenHook = async (token: TokenDocumentPF2e, ..._args) => {
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
};

export const renderActorSheetHook = (sheet: ActorSheet, $html: JQuery) => {
    if (game.settings.get(MODULENAME, "creatureBuilder")) {
        enableCreatureBuilderButton(sheet, $html);
    }

    if (game.settings.get(MODULENAME, "quickQuantities")) {
        onQuantitiesHook(sheet, $html);
    }

    if (game.settings.get(MODULENAME, "castPrivateSpell")) {
        $html.find(".cast-spell").each((_i, e) => {
            const $e = $(e);
            $e.addClass(`xdy-pf2e-workbench-secret-spell`);
        });
    }

    if (game.user?.isGM && sheet.actor?.type === NPC_TYPE && game.settings.get(MODULENAME, "addGmRKButtonToNpc")) {
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
};
