import { housepatcher, isActuallyDamageRoll, logDebug, shouldIHandleThis } from "./utils.js";
import { ActorPF2e, CreaturePF2e } from "@actor";
import { TokenDocumentPF2e } from "@scene";
import { CHARACTER_TYPE, MODULENAME, NPC_TYPE } from "./xdy-pf2e-workbench.js";
import { UserPF2e } from "@module/user/index.js";
import { actionsReminder, autoReduceStunned, reminderTargeting } from "./feature/reminders/index.js";
import {
    chatActionCardDescriptionCollapse,
    chatAttackCardDescriptionCollapse,
    chatCardDescriptionCollapse,
    damageCardExpand,
    mystifyNpcItems,
} from "./feature/qolHandler/index.js";
import { autoRollDamage, persistentDamage, persistentHealing } from "./feature/damageHandler/index.js";
import { reduceFrightened } from "./feature/conditionHandler/index.js";
import {
    mangleNamesInChatMessage,
    renderNameHud,
    tokenCreateMystification,
} from "./feature/tokenMystificationHandler/index.js";
import { ItemPF2e } from "@item/base/document.js";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.js";
import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { CheckRoll } from "@module/system/check/roll.js";
import { PhysicalItemPF2e } from "@item/physical/document.js";
import { ActorSystemData } from "@actor/data/base.js";
import { ActorSheetPF2e } from "@actor/sheet/base.js";
import {
    dyingHandlingPreCreateChatMessageHook,
    dyingHandlingPreUpdateActorHook,
    handleDyingRecoveryRoll,
    itemHandlingItemHook,
} from "./feature/damageHandler/dyingHandling.ts";
import { checkAttackValidity } from "./feature/reminders/checkAttackValidity.js";
import { reminderBreathWeapon } from "./feature/reminders/reminderBreathWeapon.js";
import { castPrivateSpellHideName, handlePrivateSpellcasting } from "./feature/qolHandler/handlePrivateSpellcasting.js";
import { FeatPF2e } from "@item/feat/document.js";

export const preCreateChatMessageHook = (message: ChatMessagePF2e, data: any, _options, _user: UserPF2e) => {
    let proceed = true;
    const reminderTargetingEnabled = game.settings.get(MODULENAME, "reminderTargeting") === "mustTarget";
    const reminderCannotAttack = String(game.settings.get(MODULENAME, "reminderCannotAttack"));
    const castPrivateSpellEnabled = game.settings.get(MODULENAME, "castPrivateSpell");
    const ctrlHeld = ["ControlLeft", "ControlRight", "MetaLeft", "MetaRight", "Meta", "OsLeft", "OsRight"].some((key) =>
        game?.keyboard.downKeys.has(key),
    );
    const privateCast = castPrivately(
        game.actors?.party?.members?.some((member) => member.id === message.actor?.id) ?? false,
        message,
    );

    if (
        castPrivateSpellEnabled &&
        message.flags.pf2e?.casting?.id &&
        ((ctrlHeld && !privateCast) || (!ctrlHeld && privateCast))
    ) {
        handlePrivateSpellcasting(data, message).then();
    }

    if (reminderTargetingEnabled) {
        proceed = reminderTargeting(message, String(game.settings.get(MODULENAME, "reminderTargeting")));
    }

    if (proceed && reminderCannotAttack === "cancelAttack") {
        proceed = checkAttackValidity(message, true);
    }

    return proceed;
};

function castPrivately(inParty: boolean, message: ChatMessagePF2e) {
    const isNpc = message.actor?.type === NPC_TYPE;
    const isAlly = message.actor?.alliance === "party";
    const alwaysNpc = game.settings.get(MODULENAME, "castPrivateSpellAlwaysFor") === "npcs";
    const alwaysNonAlly = game.settings.get(MODULENAME, "castPrivateSpellAlwaysFor") === "nonAllies";
    const alwaysNonParty = game.settings.get(MODULENAME, "castPrivateSpellAlwaysFor") === "nonPartymembers";

    return (isNpc && alwaysNpc) || (!isAlly && alwaysNonAlly) || (!inParty && alwaysNonParty);
}

export function createChatMessageHook(message: ChatMessagePF2e) {
    const reminderCancelAttack = String(game.settings.get(MODULENAME, "reminderCannotAttack"));
    if (reminderCancelAttack === "reminder") {
        checkAttackValidity(message, false);
    }

    const reminderTargetingSetting = String(game.settings.get(MODULENAME, "reminderTargeting"));
    if (["no", "reminder"].includes(reminderTargetingSetting)) {
        reminderTargeting(message, reminderTargetingSetting);
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
    dyingHandlingPreCreateChatMessageHook(message);
}

function deprecatedDyingHandlingRenderChatMessageHook(message: ChatMessagePF2e) {
    handleDyingRecoveryRoll(message, Boolean(game.settings.get(MODULENAME, "handleDyingRecoveryRoll")));
}

export function renderChatMessageHook(message: ChatMessagePF2e, jq: JQuery) {
    const html = <HTMLElement>jq.get(0);
    // Only acts on latest message, but can't be in createChatMessageHook as that doesn't get triggered for some reason.
    persistentHealing(message, Boolean(game.settings.get(MODULENAME, "applyPersistentHealing")));

    if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
        persistentDamage(message);
    }

    deprecatedDyingHandlingRenderChatMessageHook(message);

    // Affects all messages
    const minimumUserRoleFlag: any = message.getFlag(MODULENAME, "minimumUserRole");
    if (!isNaN(minimumUserRoleFlag) && minimumUserRoleFlag > game.user.role) {
        html.classList.add("xdy-pf2e-workbench-hide");
    }

    if (game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
        mangleNamesInChatMessage(message, html);
    }

    if (isActuallyDamageRoll(message)) {
        const expandDamageRolls = String(game.settings.get(MODULENAME, "autoExpandDamageRolls"));
        if (["expandedAll", "expandedNew", "expandedNewest"].includes(expandDamageRolls)) {
            damageCardExpand(message, html, expandDamageRolls);
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
        const element: any = jq.get(0);

        if (element) {
            const tags = element.querySelector(".flavor-text > .tags.modifiers");
            const formulaElem = element.querySelector(".reroll-discard .dice-formula");
            const newTotalElem = element.querySelector(".reroll-second .dice-total");
            if (tags && formulaElem && newTotalElem) {
                // Add a tag to the list of modifiers
                const newTag = document.createElement("span");
                newTag.classList.add("tag", "tag_transparent", "keeley-add-10");
                newTag.innerText = game.i18n.localize(`${MODULENAME}.SETTINGS.keeleysHeroPointRule.bonusTag`);
                newTag.dataset.slug = "keeley-add-10";
                const querySelector = tags.querySelector(".tag");
                if (querySelector?.dataset.visibility === "gm") {
                    newTag.dataset.visibility = "gm";
                }
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
}

function dropHeldItemsOnBecomingUnconscious(actor) {
    const items = <PhysicalItemPF2e[]>actor.items?.filter((i) => i.isHeld);
    if (items && items.length > 0) {
        for (const item of items) {
            if (item.traits.has("free-hand") || item.type === "shield" || item.traits.has("attached-to-shield")) {
                // Presumed to strapped to an arm/worn on a hand, so just unreadied instead of dropped
                actor.changeCarryType(item, { carryType: "worn", handsHeld: 0, inSlot: false });
            } else {
                actor.changeCarryType(item, { carryType: "dropped", handsHeld: 0, inSlot: false });
            }
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
    await itemHandlingItemHook(item);
}

export function pf2eEndTurnHook(combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string) {
    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        reduceFrightened(combatant, userId).then(() => logDebug("Workbench reduceFrightened complete"));
    }
}

export async function pf2eStartTurnHook(combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string) {
    const forWhom = String(game.settings.get(MODULENAME, "actionsReminderAllow"));
    if (game.settings.get(MODULENAME, "autoReduceStunned")) {
        autoReduceStunned(combatant, userId).then((reduction) => {
            if (forWhom !== "none") {
                actionsReminder(combatant, reduction);
            }
        });
    } else if (forWhom !== "none") {
        actionsReminder(combatant, 0);
    }

    // TODO Handle removal of game.combats.active.combatant.defeated/unsetting of deathIcon (are those the same?) for combatants that are neither dying nor have 0 HP.
}

export function renderTokenHUDHook(_app: TokenDocumentPF2e, q: JQuery, data: any) {
    const html = q.get(0);
    if (html && game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
        renderNameHud(data, html);
    }
}

export async function preUpdateActorHook(actor: CreaturePF2e, update: Record<string, string>) {
    const updateHp = fu.getProperty(update, "system.attributes.hp.value");

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
            await mystifyNpcItems(actor);
        }

        const autoGainDying = String(game.settings.get(MODULENAME, "autoGainDyingAtZeroHP"));
        dyingHandlingPreUpdateActorHook(actor, update, currentActorHp, updateHp, autoGainDying);
    }
}

export function preUpdateTokenHook(_document, update, options, ..._args) {
    if (game.settings.get(MODULENAME, "tokenAnimation") && (update.x || update.y)) {
        fu.setProperty(options, "animation", {
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
    const housepatcherSetting = game.settings.get(MODULENAME, "housepatcher");
    if (game.user.isGM && housepatcherSetting) {
        await housepatcher(housepatcherSetting);
    }
}

export function renderActorSheetHook(sheet: ActorSheetPF2e<ActorPF2e>, q: JQuery) {
    const html = <HTMLElement>q.get(0);
    if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, "playerSpellsRarityColour")) {
        const spellLists = html.querySelectorAll(".spell-list");
        spellLists.forEach((list) => {
            list.querySelectorAll(".item.spell").forEach((item) => {
                const itemId = item.getAttribute("data-item-id");
                const spell = itemId ? sheet.actor?.items?.get(itemId) : null;
                if (spell) {
                    const rarity = spell.system.traits.rarity;
                    if (rarity) {
                        const h4Elements = item.querySelectorAll("h4");
                        h4Elements.forEach((h4) => h4.classList.add(`xdy-pf2e-workbench-rarity-${rarity}`));
                    }
                }
            });
        });
    }

    if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, "playerFeatsRarityColour")) {
        const featLists = html.querySelectorAll(".spell-list");
        featLists.forEach((list) => {
            list.querySelectorAll(".item.spell").forEach((item) => {
                const itemId = item.getAttribute("data-item-id");
                const feat = itemId ? sheet.actor?.items?.get(itemId) : null;
                if (feat) {
                    const rarity = feat.system.traits.rarity;
                    if (rarity) {
                        const h4Elements = item.querySelectorAll("h4");
                        h4Elements.forEach((h4) => h4.classList.add(`xdy-pf2e-workbench-rarity-${rarity}`));
                    }
                }
            });
        });
    }

    if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, "playerFeatsPrerequisiteHint")) {
        const featLists = html.querySelectorAll(".feats-pane");
        featLists.forEach((list) => {
            list.querySelectorAll(".item.spell").forEach((item) => {
                const itemId = <string>item.getAttribute("data-item-id");
                const feat: FeatPF2e | undefined | null = itemId ? <FeatPF2e>sheet.actor?.items?.get(itemId) : null;
                if (feat) {
                    const prereqs = feat.system.prerequisites.value.length > 0;
                    if (prereqs) {
                        const h4Elements = item.querySelectorAll("h4");
                        h4Elements.forEach((h4Element) => (h4Element.innerHTML += "*"));
                    }
                }
            });
        });
    }
}
