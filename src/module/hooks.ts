import {
    foundryGetProperty,
    isActuallyDamageRoll,
    logDebug,
    logInfo,
    pf2eDeepClone,
    pf2eMergeObject,
    pf2eSetProperty,
    shouldIHandleThis,
} from "./utils.js";
import { ActorPF2e } from "@actor";
import { ActorSystemData } from "@actor/data/base.js";
import { TokenDocumentPF2e } from "@scene";
import { CHARACTER_TYPE, MODULENAME, NPC_TYPE } from "./xdy-pf2e-workbench.js";
import { ActorSheetPF2e } from "@actor/sheet/base.js";
import { UserPF2e } from "@module/user/index.js";
import {
    actionsReminder,
    autoReduceStunned,
    reminderBreathWeapon,
    reminderCannotAttack,
    reminderTargeting,
} from "./feature/reminders/index.js";
import {
    castPrivateSpell,
    castPrivateSpellHideName,
    chatActionCardDescriptionCollapse,
    chatAttackCardDescriptionCollapse,
    chatCardDescriptionCollapse,
    damageCardExpand,
    mystifyNpcItems,
} from "./feature/qolHandler/index.js";
import {
    autoRollDamage,
    handleDyingRecoveryRoll,
    persistentDamage,
    persistentHealing,
} from "./feature/damageHandler/index.js";
import {
    autoRemoveDyingAtGreaterThanZeroHp,
    autoRemoveUnconsciousAtGreaterThanZeroHP,
    checkIfLatestDamageMessageIsCriticalHitByEnemy,
    giveUnconsciousIfDyingRemovedAt0HP,
    giveWoundedWhenDyingRemoved,
    handleDyingOnZeroHP,
    reduceFrightened,
} from "./feature/conditionHandler/index.js";
import {
    mangleNamesInChatMessage,
    renderNameHud,
    tokenCreateMystification,
} from "./feature/tokenMystificationHandler/index.js";
import { ItemPF2e } from "@item/base/document.js";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.js";
import { moveOnZeroHP } from "./feature/initiativeHandler/index.js";
import { ChatMessagePF2e } from "@module/chat-message/document.js";
import { CreaturePF2e } from "@actor/creature/document.js";
import { CheckRoll } from "@module/system/check/roll.js";

export const preCreateChatMessageHook = (message: ChatMessagePF2e, data: any, _options, _user: UserPF2e) => {
    let proceed = true;
    if (game.settings.get(MODULENAME, "reminderTargeting") === "mustTarget") {
        proceed = reminderTargeting(message);
    }

    if (String(game.settings.get(MODULENAME, "reminderCannotAttack")) === "cancelAttack") {
        proceed = reminderCannotAttack(message, true);
    }

    const { hasCastingId, nonNpcCasting, npcCastingAlways, npcCastingIfCtrl } = collectPrivateCastingValues(message);
    if (
        proceed &&
        game.settings.get(MODULENAME, "castPrivateSpell") &&
        hasCastingId &&
        (npcCastingAlways || npcCastingIfCtrl || nonNpcCasting)
    ) {
        castPrivateSpell(data, message).then();
    }

    return proceed;
};

function collectPrivateCastingValues(message: ChatMessagePF2e) {
    const downkeys = game?.keyboard.downKeys;

    let ctrlHeld = ["ControlLeft", "ControlRight", "MetaLeft", "MetaRight", "Meta", "OsLeft", "OsRight"].some((key) =>
        downkeys.has(key),
    );
    if (ctrlHeld === undefined) {
        ctrlHeld = game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL);
    }
    const hasCastingId = message.flags.pf2e?.casting?.id;
    const settingNpcAlways = game.settings.get(MODULENAME, "castPrivateSpellAlwaysForNPC");
    const nonNpcCasting = ctrlHeld && message.actor?.type !== NPC_TYPE;
    const npcCastingAlways = !ctrlHeld && message.actor?.type === NPC_TYPE && settingNpcAlways;
    const npcCastingIfCtrl = ctrlHeld && message.actor?.type === NPC_TYPE && !settingNpcAlways;
    return { hasCastingId, nonNpcCasting, npcCastingAlways, npcCastingIfCtrl };
}

export function handleDying(dyingCounter: number, originalDyingCounter: number, actor) {
    // Can't await, so do the math.
    const defeated = actor.combatant?.defeated;
    const shouldDie = originalDyingCounter + dyingCounter >= actor.system.attributes.dying.max && !defeated;
    const shouldBecomeDying = originalDyingCounter + dyingCounter > 0 && !defeated;
    if (shouldDie) {
        actor.combatant?.toggleDefeated().then();
        // Dead, not dying, so clear the flag.
        actor.unsetFlag(MODULENAME, "dyingLastApplied").then();
    } else if (shouldBecomeDying) {
        actor
            .increaseCondition("dying", {
                value: originalDyingCounter + dyingCounter,
            })
            .then();
        actor.setFlag(MODULENAME, "dyingLastApplied", Date.now()).then();
    } else {
        actor.decreaseCondition("dying", { forceRemove: true }).then();
        actor.unsetFlag(MODULENAME, "dyingLastApplied").then();
    }
}

export function createChatMessageHook(message: ChatMessagePF2e) {
    if (String(game.settings.get(MODULENAME, "reminderCannotAttack")) === "reminder") {
        reminderCannotAttack(message, false);
    }

    if (["no", "reminder"].includes(String(game.settings.get(MODULENAME, "reminderTargeting")))) {
        reminderTargeting(message);
    }

    if (!isActuallyDamageRoll(message)) {
        if (
            game.settings.get(MODULENAME, "autoRollDamageAllow") &&
            (game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
                game.settings.get(MODULENAME, "autoRollDamageForSpellAttack") ||
                game.settings.get(MODULENAME, "autoRollDamageForSpellWhenNotAnAttack") !== "no")
        ) {
            autoRollDamage(message).then();
        }

        if (game.settings.get(MODULENAME, "reminderBreathWeapon")) {
            reminderBreathWeapon(message).then();
        }
    }
    if (!String(game.settings.get(MODULENAME, "autoGainDyingIfTakingDamageWhenAlreadyDying")).startsWith("no")) {
        const actor = message.actor;
        if (actor && shouldIHandleThis(actor)) {
            const now = Date.now();
            const flag = <number>actor.getFlag(MODULENAME, "dyingLastApplied") || Date.now();

            if (message.content?.includes("damage-taken")) {
                // Ignore this if it occurs within last few seconds of the last time we applied dying
                // @ts-ignore
                const notTooSoon = !flag?.between(now - 4000, now);
                if (notTooSoon) {
                    const dyingOption = String(
                        game.settings.get(MODULENAME, "autoGainDyingIfTakingDamageWhenAlreadyDying"),
                    );
                    const originalDyingCounter = actor?.getCondition("dying")?.value ?? 0;
                    let dyingCounter = 0;
                    if (!dyingOption.startsWith("no") && originalDyingCounter > 0) {
                        const wasCritical = checkIfLatestDamageMessageIsCriticalHitByEnemy(actor, dyingOption);

                        if (
                            dyingOption.endsWith("ForCharacters")
                                ? ["character", "familiar"].includes(actor.type)
                                : true
                        ) {
                            dyingCounter = dyingCounter + 1;

                            if (wasCritical) {
                                dyingCounter = dyingCounter + 1;
                            }
                        }
                        handleDying(dyingCounter, originalDyingCounter, actor);
                    }
                }
            }
        }
    }
}

export function renderChatMessageHook(message: ChatMessagePF2e, html: JQuery) {
    // Only acts on latest message, but can't be in createChatMessageHook as that doesn't get triggered for some reason.
    if (game.settings.get(MODULENAME, "applyPersistentHealing")) {
        persistentHealing(message);
    }

    if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
        persistentDamage(message);
    }

    if (game.settings.get(MODULENAME, "handleDyingRecoveryRoll")) {
        handleDyingRecoveryRoll(message);
    }

    // Affects all messages
    const minimumUserRoleFlag: any = message.getFlag(MODULENAME, "minimumUserRole");
    if (!isNaN(minimumUserRoleFlag) && minimumUserRoleFlag > game.user.role) {
        html.addClass("xdy-pf2e-workbench-hide");
    }

    if (game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
        mangleNamesInChatMessage(message, html);
    }

    if (isActuallyDamageRoll(message)) {
        if (
            String(game.settings.get(MODULENAME, "autoExpandDamageRolls")) === "expandedAll" ||
            String(game.settings.get(MODULENAME, "autoExpandDamageRolls")) === "expandedNew" ||
            String(game.settings.get(MODULENAME, "autoExpandDamageRolls")) === "expandedNewest"
        ) {
            damageCardExpand(message, html);
        }
    } else {
        if (
            String(game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) === "collapsedDefault" ||
            String(game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) === "nonCollapsedDefault"
        ) {
            chatCardDescriptionCollapse(html);
        }
        if (
            (String(game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent")) === "collapsedDefault" ||
                String(game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent")) ===
                    "nonCollapsedDefault") &&
            ["weapon", "melee", "spell"].includes(message.item?.type ?? "")
        ) {
            chatAttackCardDescriptionCollapse(html);
        }
        if (
            ((String(game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent")) === "collapsedDefault" ||
                String(game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent")) ===
                    "nonCollapsedDefault") &&
                !message.item) ||
            message.item?.type === "action"
        ) {
            chatActionCardDescriptionCollapse(html);
        }
    }

    if (
        game.settings.get(MODULENAME, "castPrivateSpellHideName") &&
        message?.flags?.pf2e?.origin?.type === "spell" &&
        isActuallyDamageRoll(message)
    ) {
        castPrivateSpellHideName(message, html);
    }

    // Alert everyone that Keeley's hero point rule was invoked
    const lastRoll = message.rolls.at(-1);
    if (lastRoll?.options.keeleyAdd10) {
        const element = html[0];

        const tags = Array.from(element.querySelectorAll(".flavor-text > .tags")).at(-1);
        const formulaElem = element.querySelector<HTMLElement>(".pf2e-reroll-discard .dice-formula");
        const newTotalElem = element.querySelector<HTMLElement>(".pf2e-reroll-second .dice-total");
        if (tags && formulaElem && newTotalElem) {
            // Add a tag to the list of modifiers
            const newTag = document.createElement("span");
            newTag.classList.add("tag", "tag_transparent", "keeley-add-10");
            newTag.innerText = game.i18n.localize(`${MODULENAME}.SETTINGS.keeleysHeroPointRule.bonusTag`);
            tags.append(newTag);

            // Show +10 in the formula
            const span = document.createElement("span");
            span.className = "keeley-add-10";
            span.innerText = " + 10";
            formulaElem?.append(span);

            // Make the total purple
            newTotalElem.classList.add("keeley-add-10");
        }
    }
}

function dropHeldItemsOnBecomingUnconscious(actor) {
    const items = actor.items.filter((item) => {
        return (
            // Buckler is excluded because it is strapped to the arm. Other things may also be strapped to an arm, but I have no way of knowing that.
            item.isHeld && item.handsHeld > 0 && item.system.equipped.carryType === "held" && item.slug !== "buckler"
        );
    });
    if (items.length > 0) {
        for (const item of items) {
            actor.adjustCarryType(item, { carryType: "dropped", handsHeld: 0, inSlot: false });
        }
        const message = game.i18n.format(`${MODULENAME}.SETTINGS.dropHeldItemsOnBecomingUnconscious.message`, {
            name: game?.scenes?.current?.tokens?.find((t) => t.actor?.id === actor.id)?.name ?? actor.name,
            items: items.map((i) => i.name).join(", "),
        });
        ChatMessage.create({
            flavor: message,
            speaker: ChatMessage.getSpeaker({ actor }),
        }).then();
    }
}

export async function createItemHook(item: ItemPF2e, _options: {}, _id: any) {
    if (
        item.actor?.isOfType(CHARACTER_TYPE) &&
        item.actor.hasCondition("unconscious") &&
        game.settings.get(MODULENAME, "dropHeldItemsOnBecomingUnconscious") &&
        shouldIHandleThis(item.actor)
    ) {
        dropHeldItemsOnBecomingUnconscious(item.actor);
    }
}

export async function updateItemHook(_item: ItemPF2e, _update: any) {}

export async function deleteItemHook(item: ItemPF2e, _options: {}) {
    if (
        game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
        game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")
    ) {
        if (game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved")) {
            giveWoundedWhenDyingRemoved(item).then(() => {
                logDebug("Workbench giveWoundedWhenDyingRemoved complete");
                if (game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")) {
                    giveUnconsciousIfDyingRemovedAt0HP(item).then(() => {
                        logDebug("Workbench giveUnconsciousIfDyingRemovedAt0HP complete");
                    });
                }
            });
        } else if (game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")) {
            await giveUnconsciousIfDyingRemovedAt0HP(item);
        }
    }
}

export function pf2eEndTurnHook(combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string) {
    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        reduceFrightened(combatant, userId).then(() => logDebug("Workbench reduceFrightened complete"));
    }
}

export async function pf2eStartTurnHook(combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) {
    const forWhom = String(game.settings.get(MODULENAME, "actionsReminderAllow"));
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
}

export function renderTokenHUDHook(_app: TokenDocumentPF2e, html: JQuery, data: any) {
    if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
        renderNameHud(data, html);
    }
}

export async function preUpdateActorHook(actor: CreaturePF2e, update: Record<string, string>) {
    const updateHp = foundryGetProperty(update, "system.attributes.hp.value");

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
            String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems")) === "onZeroHp"
        ) {
            await mystifyNpcItems(actor.items);
        }

        const automoveIfZeroHP =
            game.combat &&
            ((String(game.settings.get(MODULENAME, "enableAutomaticMove")) === "reaching0HPCharactersOnly" &&
                actor.type === CHARACTER_TYPE) ||
                (String(game.settings.get(MODULENAME, "enableAutomaticMove")) === "reaching0HP" &&
                    [CHARACTER_TYPE, NPC_TYPE].includes(actor.type)));
        if (!String(game.settings.get(MODULENAME, "autoGainDyingAtZeroHP")).startsWith("no")) {
            handleDyingOnZeroHP(actor, pf2eDeepClone(update), currentActorHp, updateHp).then((hpRaisedAbove0) => {
                logDebug("Workbench increaseDyingOnZeroHP complete");
                if (hpRaisedAbove0) {
                    if (!String(game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP")).startsWith("no")) {
                        // Ugh.
                        new Promise((resolve) => setTimeout(resolve, 250)).then(() => {
                            autoRemoveDyingAtGreaterThanZeroHp(actor, currentActorHp <= 0 && hpRaisedAbove0).then(
                                () => {
                                    logDebug("Workbench autoRemoveDyingAtGreaterThanZeroHP complete");
                                    if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                                        autoRemoveUnconsciousAtGreaterThanZeroHP(
                                            actor,
                                            currentActorHp <= 0 && hpRaisedAbove0,
                                        ).then();
                                    }
                                },
                            );
                        });
                    } else {
                        if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                            autoRemoveUnconsciousAtGreaterThanZeroHP(
                                actor,
                                currentActorHp <= 0 && hpRaisedAbove0,
                            ).then();
                        }
                    }
                } else {
                    if (automoveIfZeroHP && currentActorHp > 0 && updateHp <= 0) {
                        moveOnZeroHP(actor);
                    }
                }
            });
        } else {
            if (currentActorHp <= 0 && updateHp > 0) {
                if (!String(game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP")).startsWith("no")) {
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
            } else if (automoveIfZeroHP && currentActorHp > 0 && updateHp <= 0) {
                moveOnZeroHP(actor);
            }
        }
    }
}

export function preUpdateTokenHook(_document, update, options, ..._args) {
    if (game.settings.get(MODULENAME, "tokenAnimation") && (update.x || update.y)) {
        pf2eSetProperty(options, "animation", {
            movementSpeed: game.settings.get(MODULENAME, "tokenAnimationSpeed"),
        });
    }
}

export async function createTokenHook(token: TokenDocumentPF2e, ..._args) {
    if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
        tokenCreateMystification(token).then();
    }

    if (
        game.user?.isGM &&
        game.settings.get("pf2e", "automation.lootableNPCs") &&
        String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems")) === "onScene" &&
        token.actor &&
        token.actor.isOfType(NPC_TYPE) &&
        token.actor.items &&
        token.actor.items.size > 0
    ) {
        await mystifyNpcItems(token.actor.items);
    }
}

/** Keeley's Hero Point Rule */
export function pf2eRerollHook(
    _oldRoll: Rolled<CheckRoll>,
    newRoll: Rolled<CheckRoll>,
    heroPoint: boolean,
    keep: "new" | "higher" | "lower",
) {
    if (!heroPoint || keep !== "new") return;

    const die = newRoll.dice.find((d) => d instanceof Die && d.number === 1 && d.faces === 20);
    const result = die?.results.find((r) => r.active && r.result <= 10);
    if (die && result) {
        newRoll.terms.push(
            OperatorTerm.fromData({ class: "OperatorTerm", operator: "+", evaluated: true }),
            NumericTerm.fromData({ class: "NumericTerm", number: 10, evaluated: true }),
        );
        // @ts-ignore It's protected. Meh.
        newRoll._total += 10;
        newRoll.options.keeleyAdd10 = true;
    }
}

export async function pf2eSystemReadyHook() {
    function unflatten(object) {
        const result = {};
        Object.keys(object).forEach(function (k) {
            setValue(result, k, object[k]);
        });
        return result;
    }

    function setValue(object, path, value) {
        const split = path.split(".");
        const top = split.pop();

        split.reduce(function (o, k, i, kk) {
            return (o[k] = o[k] || (isFinite(i + 1 in kk ? kk[i + 1] : top) ? [] : {}));
        }, object)[top] = value;
    }

    async function patchObject(patch) {
        const document = await fromUuid(patch.uuid);
        if (document) {
            const compendium = document?.compendium;
            if (compendium) {
                if (patch.action === "update") {
                    const original = document?.toObject();
                    const patchData = unflatten(patch.data);
                    if (!Object.prototype.hasOwnProperty.call(patchData, "system")) {
                        patchData["system"] = {};
                    }

                    if (!Object.prototype.hasOwnProperty.call(patchData["system"], "traits")) {
                        patchData["system"]["traits"] = {};
                    }

                    if (!Object.prototype.hasOwnProperty.call(patchData["system"]["traits"], "value")) {
                        patchData["system"]["traits"]["value"] = [];
                    }

                    patchData["system"]["traits"]["value"].push("hb_workbenched");
                    const object = pf2eMergeObject(original, patchData);
                    const unflatten1 = unflatten(object);
                    await document.update(unflatten1);
                } else if (patch.action === "unlock") {
                    if (compendium.locked) {
                        await compendium.configure({ locked: false });
                    }
                } else if (patch.action === "lock") {
                    if (!compendium.locked) {
                        await compendium.configure({ locked: true });
                    }
                } else if (patch.action === "delete") {
                    await document.delete();
                    await compendium?.getIndex();
                }
            }
        }
    }

    if (game.user.isGM && game.settings.get(MODULENAME, "housepatcher") !== "") {
        try {
            const text = decodeURI(String(game.settings.get(MODULENAME, "housepatcher")));
            const json = JSON.parse(text);
            if (json.length > 0) {
                const message = game.i18n.format(`${MODULENAME}.SETTINGS.housepatcher.notification`, {
                    count: json.filter((j) => !j.action.includes("lock")).length,
                });
                ui.notifications.info(message);
                logInfo("Housepatcher: " + JSON.stringify(json, null, 2));
                for (const patch of json) {
                    await patchObject(patch);
                }
            }
        } catch (e) {
            ui.notifications.error("Bad housepatcher JSON has been deleted");
            game.settings.set(MODULENAME, "housepatcher", "");
        }
    }
}

export function renderActorSheetHook(sheet: ActorSheetPF2e<ActorPF2e>, $html: JQuery) {
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
}
