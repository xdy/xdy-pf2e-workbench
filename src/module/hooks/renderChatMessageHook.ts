import { ChatMessagePF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import * as systems from "../utils/systems.js";
import { isActuallyDamageRoll } from "../utils.js";
import {
    chatActionCardDescriptionCollapse,
    chatAttackCardDescriptionCollapse,
    chatCardDescriptionCollapse,
    damageCardExpand,
} from "../feature/qolHandler/index.js";
import { handleDyingRecoveryRoll } from "../feature/damageHandler/dyingHandling.js";
import { hideSpellNameInDamageroll } from "../feature/qolHandler/hidePrivateSpellName.js";

function needsCollapsing(setting: string): boolean {
    return setting === "collapsedDefault" || setting === "nonCollapsedDefault";
}

export function renderChatMessageHook(message: ChatMessagePF2e, html: HTMLElement): void {
    deprecatedDyingHandlingRenderChatMessageHook(message);

    const isDamageRoll = isActuallyDamageRoll(message);

    if (isDamageRoll) {
        const expandDamageRolls = String(game.settings.get(MODULENAME, "autoExpandDamageRolls"));
        if (["expandedAll", "expandedNew", "expandedNewest"].includes(expandDamageRolls)) {
            damageCardExpand(message, html, expandDamageRolls);
        }

        const castPrivateSpellEnabled = game.settings.get(MODULENAME, "castPrivateSpell");
        if (castPrivateSpellEnabled && systems.getFlag(message, "origin.type") === "spell") {
            hideSpellNameInDamageroll(message, html);
        }
    } else {
        const collapseItemContent = String(game.settings.get(MODULENAME, "autoCollapseItemChatCardContent"));
        const collapseItemAttackContent = String(
            game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent"),
        );
        const collapseItemActionContent = String(
            game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent"),
        );

        if (needsCollapsing(collapseItemContent)) {
            chatCardDescriptionCollapse(html);
        }

        const itemType = message.item?.type ?? "";
        if (needsCollapsing(collapseItemAttackContent) && ["weapon", "melee", "spell"].includes(itemType)) {
            chatAttackCardDescriptionCollapse(html);
        }

        if (needsCollapsing(collapseItemActionContent) && (itemType === "action" || !message.item)) {
            chatActionCardDescriptionCollapse(html);
        }
    }

    const heroPointRules = String(game.settings.get(MODULENAME, "heroPointRules"));
    if (heroPointRules !== "no") {
        handleVariantHeroPointRules(message, html);
    }
}

function deprecatedDyingHandlingRenderChatMessageHook(message: ChatMessagePF2e): void {
    handleDyingRecoveryRoll(message, Boolean(game.settings.get(MODULENAME, "handleDyingRecoveryRoll")));
}

function addHeroPointTag(element: HTMLElement, slug: string, localeKey: string): boolean {
    const tags = element.querySelector(".flavor-text > .tags.modifiers");
    const newTotalElem = element.querySelector(".reroll-second .dice-total");
    if (!tags || !newTotalElem) return false;

    const newTag = document.createElement("span");
    newTag.classList.add("tag", "tag_transparent", slug);
    newTag.innerText = game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointRules.${localeKey}`);
    newTag.dataset.slug = slug;

    const existingTag = tags.querySelector(".tag") as HTMLElement;
    if (existingTag?.dataset.visibility === "gm") {
        newTag.dataset.visibility = "gm";
    }

    tags.append(newTag);
    newTotalElem.classList.add(slug);
    return true;
}

function handleVariantHeroPointRules(message: ChatMessagePF2e, element: HTMLElement): void {
    const lastRoll = message.rolls.at(-1);
    if (!lastRoll) return;

    if (lastRoll.options.keeleyAdd10) {
        if (addHeroPointTag(element, "keeley-add-10", "bonusTagKeeleys")) {
            const formulaElem = element.querySelector(".reroll-discard .dice-formula");
            if (formulaElem) {
                const span = document.createElement("span");
                span.className = "keeley-add-10";
                span.innerText = " + 10";
                formulaElem.append(span);
            }
        }
    }

    if (lastRoll.options.useHighestRoll) {
        addHeroPointTag(element, "use-highest-roll", "bonusTagUseHighestRoll");
    }

    if (lastRoll.options.heroicReroll) {
        addHeroPointTag(element, "heroic-reroll", "bonusTagHeroicRerolls");
    }
}
