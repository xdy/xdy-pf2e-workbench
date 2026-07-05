import { ChatMessagePF2e } from "foundry-pf2e";
import { MODULENAME } from "../constants.ts";
import * as systems from "../utils/systems.ts";
import { getModuleSetting, isActuallyDamageRoll } from "../utils.ts";
import {
    chatActionCardDescriptionCollapse,
    chatAttackCardDescriptionCollapse,
    chatCardDescriptionCollapse,
    damageCardExpand,
} from "../feature/qolHandler/index.ts";
import { handleDyingRecoveryRoll } from "../feature/damageHandler/dyingHandling.ts";
import { hideSpellNameInDamageroll } from "../feature/qolHandler/hidePrivateSpellName.ts";

function needsCollapsing(setting: string): boolean {
    return setting === "collapsedDefault" || setting === "nonCollapsedDefault";
}

export function renderChatMessageHook(message: ChatMessagePF2e, html: HTMLElement): void {
    deprecatedDyingHandlingRenderChatMessageHook(message);

    const isDamageRoll = isActuallyDamageRoll(message);

    if (isDamageRoll) {
        const expandDamageRolls = getModuleSetting<string>("autoExpandDamageRolls");
        if (["expandedAll", "expandedNew", "expandedNewest"].includes(expandDamageRolls)) {
            damageCardExpand(message, html, expandDamageRolls);
        }

        const castPrivateSpellEnabled = getModuleSetting("castPrivateSpell");
        if (castPrivateSpellEnabled && systems.getFlag(message, "origin.type") === "spell") {
            hideSpellNameInDamageroll(message, html);
        }
    } else {
        const collapseItemContent = getModuleSetting<string>("autoCollapseItemChatCardContent");
        const collapseItemAttackContent = getModuleSetting<string>("autoCollapseItemAttackChatCardContent");
        const collapseItemActionContent = getModuleSetting<string>("autoCollapseItemActionChatCardContent");

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

    const heroPointRules = getModuleSetting<string>("heroPointRules");
    if (heroPointRules !== "no") {
        handleVariantHeroPointRules(message, html);
    }
}

function deprecatedDyingHandlingRenderChatMessageHook(message: ChatMessagePF2e): void {
    handleDyingRecoveryRoll(message, getModuleSetting<boolean>("handleDyingRecoveryRoll"));
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
