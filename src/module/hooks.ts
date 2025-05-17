import { housepatcher, isActuallyDamageRoll, logDebug, shouldIHandleThis } from "./utils.js";
import {
    ActorPF2e,
    ActorSheetPF2e,
    ActorSystemData,
    ChatMessagePF2e,
    CheckRoll,
    CombatantPF2e,
    CreaturePF2e,
    EncounterPF2e,
    FeatPF2e,
    ItemPF2e,
    PhysicalItemPF2e,
    TokenDocumentPF2e,
    UserPF2e,
} from "foundry-pf2e";
import { CHARACTER_TYPE, MODULENAME, NPC_TYPE } from "./xdy-pf2e-workbench.js";
import { actionsReminder, autoReduceStunned, reminderTargeting } from "./feature/reminders/index.js";
import {
    chatActionCardDescriptionCollapse,
    chatAttackCardDescriptionCollapse,
    chatCardDescriptionCollapse,
    damageCardExpand,
    mystifyNpcItems,
} from "./feature/qolHandler/index.js";
import { autoRollDamage, persistentDamageHealing } from "./feature/damageHandler/index.js";
import { reduceFrightened } from "./feature/conditionHandler/index.js";
import { renderNameHud, tokenCreateMystification } from "./feature/tokenMystificationHandler/index.js";
import {
    dyingHandlingCreateChatMessageHook,
    dyingHandlingPreUpdateActorHook,
    handleDyingRecoveryRoll,
    itemHandlingItemHook,
} from "./feature/damageHandler/dyingHandling.ts";
import { checkAttackValidity } from "./feature/reminders/checkAttackValidity.js";
import { reminderBreathWeapon } from "./feature/reminders/reminderBreathWeapon.js";
import {
    handlePrivateSpellcasting,
    hideSpellNameInDamageroll,
} from "./feature/qolHandler/handlePrivateSpellcasting.js";

export const preCreateChatMessageHook = (message: ChatMessagePF2e, data: any, _options, _user: UserPF2e) => {
    let proceed = true;

    const reminderTargetingEnabled = String(game.settings.get(MODULENAME, "reminderTargeting")) === "mustTarget";
    const reminderCannotAttack = String(game.settings.get(MODULENAME, "reminderCannotAttack"));
    const castPrivateSpellEnabled = game.settings.get(MODULENAME, "castPrivateSpell");

    // Handle private spellcasting
    if (castPrivateSpellEnabled && message.flags.pf2e?.casting?.id) {
        const ctrlHeld = ["ControlLeft", "ControlRight", "MetaLeft", "MetaRight", "Meta", "OsLeft", "OsRight"].some(
            (key) => game?.keyboard.downKeys.has(key),
        );
        const inParty = game.actors?.party?.members?.some((member) => member?.id === message?.actor?.id) ?? false;
        const privateCast = castPrivately(inParty, message);

        if ((ctrlHeld && !privateCast) || (!ctrlHeld && privateCast)) {
            handlePrivateSpellcasting(data, message).then();
        }
    }

    // Handle persistent damage/healing
    const applyPersistentDamage = game.settings.get(MODULENAME, "applyPersistentDamage");
    const applyPersistentHealing = game.settings.get(MODULENAME, "applyPersistentHealing");
    if (applyPersistentDamage || applyPersistentHealing) {
        persistentDamageHealing(message);
    }

    // Handle targeting reminders
    if (reminderTargetingEnabled) {
        proceed = reminderTargeting(message, String(game.settings.get(MODULENAME, "reminderTargeting")));
    }

    // Handle attack validity
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

    // Early return for damage rolls or damage taken messages
    function isDamageTaken(message: ChatMessagePF2e) {
        return message.flags?.pf2e?.context?.type === "damage-taken";
    }

    const isDamageRoll = isActuallyDamageRoll(message);
    const isDamage = isDamageRoll || isDamageTaken(message);

    if (!isDamage) {
        // Check if we need to auto roll damage
        const autoRollDamageAllow = game.settings.get(MODULENAME, "autoRollDamageAllow");
        const autoRollDamageForStrike = game.settings.get(MODULENAME, "autoRollDamageForStrike");
        const autoRollDamageForSpellAttack = game.settings.get(MODULENAME, "autoRollDamageForSpellAttack");
        const autoRollDamageForSpellWhenNotAnAttack = game.settings.get(
            MODULENAME,
            "autoRollDamageForSpellWhenNotAnAttack",
        );

        const shouldAutoRollDamage =
            autoRollDamageAllow &&
            (autoRollDamageForStrike || autoRollDamageForSpellAttack || autoRollDamageForSpellWhenNotAnAttack !== "no");

        if (shouldAutoRollDamage) {
            autoRollDamage(message).then();
        }

        // Check if we need to remind about breath weapon
        const reminderBreathWeaponEnabled = game.settings.get(MODULENAME, "reminderBreathWeapon");
        if (reminderBreathWeaponEnabled) {
            reminderBreathWeapon(message).then();
        }
    }

    // Always process dying handling
    dyingHandlingCreateChatMessageHook(message);
}

function deprecatedDyingHandlingRenderChatMessageHook(message: ChatMessagePF2e) {
    handleDyingRecoveryRoll(message, Boolean(game.settings.get(MODULENAME, "handleDyingRecoveryRoll")));
}

export function renderChatMessageHook(message: ChatMessagePF2e, jq: JQuery) {
    const html = <HTMLElement>jq.get(0);

    // Early return if html is not valid
    if (!html) return;

    deprecatedDyingHandlingRenderChatMessageHook(message);

    const isDamageRoll = isActuallyDamageRoll(message);

    if (isDamageRoll) {
        const expandDamageRolls = String(game.settings.get(MODULENAME, "autoExpandDamageRolls"));
        if (["expandedAll", "expandedNew", "expandedNewest"].includes(expandDamageRolls)) {
            damageCardExpand(message, html, expandDamageRolls);
        }
    } else {
        // Get settings
        const collapseItemContent = String(game.settings.get(MODULENAME, "autoCollapseItemChatCardContent"));
        const collapseItemAttackContent = String(
            game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent"),
        );
        const collapseItemActionContent = String(
            game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent"),
        );

        // Check if we need to do any collapsing
        const needsCollapsing =
            collapseItemContent === "collapsedDefault" ||
            collapseItemContent === "nonCollapsedDefault" ||
            collapseItemAttackContent === "collapsedDefault" ||
            collapseItemAttackContent === "nonCollapsedDefault" ||
            collapseItemActionContent === "collapsedDefault" ||
            collapseItemActionContent === "nonCollapsedDefault";

        if (!needsCollapsing) return;

        // Only process if needed
        if (collapseItemContent === "collapsedDefault" || collapseItemContent === "nonCollapsedDefault") {
            chatCardDescriptionCollapse(html);
        }

        const itemType = message.item?.type ?? "";
        if (
            (collapseItemAttackContent === "collapsedDefault" || collapseItemAttackContent === "nonCollapsedDefault") &&
            ["weapon", "melee", "spell"].includes(itemType)
        ) {
            chatAttackCardDescriptionCollapse(html);
        }

        if (
            ((collapseItemActionContent === "collapsedDefault" ||
                collapseItemActionContent === "nonCollapsedDefault") &&
                !message.item) ||
            itemType === "action"
        ) {
            chatActionCardDescriptionCollapse(html);
        }
    }

    // Check if we need to handle private spells
    const castPrivateSpellEnabled = game.settings.get(MODULENAME, "castPrivateSpell");
    if (castPrivateSpellEnabled && message?.flags?.pf2e?.origin?.type === "spell" && isDamageRoll) {
        hideSpellNameInDamageroll(message, html);
    }

    // Check if we need to handle hero point rules
    const heroPointRules = String(game.settings.get(MODULENAME, "heroPointRules"));
    if (heroPointRules !== "no") {
        handleVariantHeroPointRules(message, jq);
    }
}

// Extracted to separate function to improve readability
function handleVariantHeroPointRules(message: ChatMessagePF2e, jq: JQuery) {
    const lastRoll = message.rolls.at(-1);
    if (!lastRoll) return;

    const element: any = jq.get(0);
    if (!element) return;

    // Handle Keeley's hero point rule
    if (lastRoll.options.keeleyAdd10) {
        const tags = element.querySelector(".flavor-text > .tags.modifiers");
        const formulaElem = element.querySelector(".reroll-discard .dice-formula");
        const newTotalElem = element.querySelector(".reroll-second .dice-total");

        if (tags && formulaElem && newTotalElem) {
            // Add a tag to the list of modifiers
            const newTag = document.createElement("span");
            newTag.classList.add("tag", "tag_transparent", "keeley-add-10");
            newTag.innerText = game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointRules.bonusTagKeeleys`);
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

    // Handle use highest roll hero point rule
    if (lastRoll.options.useHighestRoll) {
        const tags = element.querySelector(".flavor-text > .tags.modifiers");
        const formulaElem = element.querySelector(".reroll-discard .dice-formula");
        const newTotalElem = element.querySelector(".reroll-second .dice-total");

        if (tags && formulaElem && newTotalElem) {
            const newTag = document.createElement("span");
            newTag.classList.add("tag", "tag_transparent", "use-highest-roll");
            newTag.innerText = game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointRules.bonusTagUseHighestRoll`);
            newTag.dataset.slug = "use-highest-roll";

            const querySelector = tags.querySelector(".tag");
            if (querySelector?.dataset.visibility === "gm") {
                newTag.dataset.visibility = "gm";
            }

            tags.append(newTag);
            newTotalElem.classList.add("use-highest-roll");
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

function sheatheHeldItemsAfterEncounter(encounter: EncounterPF2e) {
    async function sheatheHeldItems(actor) {
        const items = <PhysicalItemPF2e[]>actor.items?.filter((i) => i.isHeld);
        if (items && items.length > 0) {
            const itemTypes = String(game.settings.get(MODULENAME, "sheatheHeldItemsAfterEncounterTypes"))
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t);
            const itemsToSheathe = items.filter((i) => itemTypes.includes(i.type));
            if (itemsToSheathe.length > 0) {
                for (const item of itemsToSheathe) {
                    await actor.changeCarryType(item, { carryType: "worn", handsHeld: 0, inSlot: false });
                }
                const message = game.i18n.format(`${MODULENAME}.SETTINGS.sheatheHeldItemsAfterEncounter.message`, {
                    name: game?.scenes?.current?.tokens?.find((t) => t.actor?.id === actor.id)?.name ?? actor.name,
                    items: itemsToSheathe.map((i) => i.name).join(", "),
                });
                ChatMessage.create({
                    flavor: message,
                    speaker: ChatMessage.getSpeaker({ actor }),
                }).then();
            }
        }
    }

    encounter.combatants.forEach(async (combatant) => {
        await sheatheHeldItems(combatant.actor);
    });
}

export async function createItemHook(item: ItemPF2e, _options: any, _id: any) {
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

export async function deleteItemHook(item: ItemPF2e, _options: any) {
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

export function renderTokenHUDHook(_app: TokenDocumentPF2e, q: JQuery | HTMLElement, data: any) {
    let html: any;
    if (!foundry.utils.isNewerVersion(game.version, 13)) {
        // v12 remove later
        // @ts-expect-error
        html = q.get(0);
    }

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
    if (game.settings.get(MODULENAME, "tokenAnimation") && (update.x !== null || update.y !== null)) {
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

/** Hero Point variant rules */
export function pf2eRerollHook(
    oldRoll: Rolled<CheckRoll>,
    newRoll: Rolled<CheckRoll>,
    heroPoint: boolean,
    keep: "new" | "higher" | "lower",
) {
    if (!heroPoint || keep !== "new") return;

    // @ts-ignore
    const die = newRoll.dice.find((d) => d instanceof foundry.dice.terms.Die && d.number === 1 && d.faces === 20);
    const result = die?.results.find((r) => r.active && r.result <= 10);

    // Handle Keeley's Hero Point Rule
    if (die && result && game.settings.get(MODULENAME, "heroPointRules") === "keeleysHeroPointRule") {
        newRoll.terms.push(
            // @ts-ignore
            foundry.dice.terms.OperatorTerm.fromData({ class: "OperatorTerm", operator: "+", evaluated: true }),
            // @ts-ignore
            foundry.dice.terms.NumericTerm.fromData({ class: "NumericTerm", number: 10, evaluated: true }),
        );
        // @ts-ignore It's protected. Meh.
        newRoll._total += 10;
        newRoll.options.keeleyAdd10 = true;
    } else if (game.settings.get(MODULENAME, "heroPointRules") === "useHighestHeroPointRoll") {
        // Handle useHighestHeroPointRoll setting
        const oldDie = oldRoll.dice.find(
            (d) => d instanceof foundry.dice.terms.Die && d.number === 1 && d.faces === 20,
        );
        const oldResult = oldDie?.results.find((r) => r.active)?.result ?? 0;
        const newResult = die?.results.find((r) => r.active)?.result ?? 0;

        if (oldResult > newResult) {
            // Replace the new roll's d20 result with the old roll's result
            if (die && die.results.length > 0) {
                die.results[0].result = oldResult;
                // @ts-ignore It's protected. Meh.
                newRoll._total = newRoll.options.keeleyAdd10 ? oldRoll._total + 10 : oldRoll._total;
                newRoll.options.useHighestRoll = true;
            }
        }
        return;
    }
}

export async function pf2eSystemReadyHook() {
    const housepatcherSetting = game.settings.get(MODULENAME, "housepatcher");
    if (game.user.isGM && housepatcherSetting) {
        await housepatcher(housepatcherSetting);
    }
}

export async function deleteCombatHook(encounter: EncounterPF2e, _options: any) {
    if (game.settings.get(MODULENAME, "sheatheHeldItemsAfterEncounter")) {
        sheatheHeldItemsAfterEncounter(encounter);
    }
}

export function renderActorSheetHook(sheet: ActorSheetPF2e<ActorPF2e>, q: JQuery) {
    const html = <HTMLElement>q.get(0);

    function itemFromCompendium(element: Element, qualifiedName: string) {
        const itemUuid = element.getAttribute(qualifiedName);
        return itemUuid ? fromUuidSync(itemUuid) : null;
    }

    function itemFromActor(element: Element, attributeName: string) {
        const itemId = <string>element.getAttribute(attributeName);
        return itemId ? sheet.actor?.items?.get(itemId) : null;
    }

    function performColoring(setting: string, listSelector: string, itemSelector: string, fetchItem) {
        if (sheet.actor?.type === CHARACTER_TYPE && game.settings.get(MODULENAME, setting)) {
            const lists = html.querySelectorAll(listSelector);
            for (const list of lists) {
                const elementNodeListOf = list.querySelectorAll(itemSelector);
                for (const element of elementNodeListOf) {
                    const item = fetchItem(element);
                    if (item) {
                        const rarity = item.system?.traits?.rarity;
                        if (rarity) {
                            const h4Elements = element.querySelectorAll("h4");
                            h4Elements.forEach((h4) => h4.classList.add(`xdy-pf2e-workbench-rarity-${rarity}`));
                        }
                    }
                }
            }
        }
    }

    performColoring("playerSpellsRarityColour", ".spell-list", ".spell", (element) =>
        itemFromActor(element, "data-item-id"),
    );

    performColoring("playerFeatsRarityColour", ".feats-pane", ".slot", (element) =>
        itemFromActor(element, "data-item-id"),
    );

    performColoring("playerCraftingRarityColour", ".crafting-pane", ".formula-item", (element) =>
        itemFromCompendium(element, "data-item-uuid"),
    );

    if (sheet.actor?.type === CHARACTER_TYPE) {
        if (game.settings.get(MODULENAME, "playerFeatsPrerequisiteHint")) {
            const featLists = html.querySelectorAll(".feats-pane");
            featLists.forEach((list) => {
                const elementNodeListOf = list.querySelectorAll(".slot");
                for (const element of elementNodeListOf) {
                    const feat: FeatPF2e | null = <FeatPF2e | null>itemFromActor(element, "data-item-id");
                    if (feat) {
                        const prereqs = feat.system.prerequisites.value.length > 0;
                        if (prereqs) {
                            const h4Elements = element.querySelectorAll("h4");
                            h4Elements.forEach((h4Element) => (h4Element.innerHTML += "*"));
                        }
                    }
                }
            });
        }

        const WORKBENCH_SPELL_TO_CHAT = "workbench-spell-to-chat";

        function processSpells() {
            document.querySelectorAll("li.spell").forEach((spellElement) => processSpellElement(spellElement));
        }

        function processSpellElement(spellElement: Element) {
            spellElement.querySelectorAll("div.item-name").forEach((itemNameDiv) => {
                const actionElement = itemNameDiv.querySelector<HTMLElement>('[data-action="item-to-chat"]');
                if (!actionElement) return;

                const currentAction = actionElement.getAttribute("data-action");
                if (currentAction === WORKBENCH_SPELL_TO_CHAT) return;

                actionElement.setAttribute("data-action", WORKBENCH_SPELL_TO_CHAT);
                actionElement.onclick = handleSpellClick;
            });
        }

        function handleSpellClick(event: MouseEvent) {
            const target = event.target as HTMLElement;
            const spellContainer = target?.closest('[data-action="workbench-spell-to-chat"]')?.parentElement
                ?.parentElement;

            if (!shouldIHandleThis(sheet.actor) || !spellContainer) return;

            const item = <ItemPF2e>itemFromActor(spellContainer, "data-item-id");
            if (!item || item.type !== "spell") return;

            const flavor = `${game.i18n.localize(`${MODULENAME}.SETTINGS.playerSpellsChangeSendToChat.text`)}<em>@UUID[${item.sourceId}]</em></p>`;
            ChatMessage.create({
                style: CONST.CHAT_MESSAGE_STYLES.OOC,
                speaker: ChatMessage.getSpeaker(),
                flavor,
            }).then();
        }

        if (game.settings.get(MODULENAME, "playerSpellsChangeSendToChat")) {
            processSpells();
        }
    }
}
