import { ActorPF2e, ActorSheetPF2e } from "foundry-pf2e";

import { extractHtmlElement, getModuleSetting } from "../utils.ts";
import { addOglTagToCharacterSheet } from "../feature/characterOglContent/index.ts";
import {
    colorActorItemsByRarity,
    itemFromActor,
    itemFromCompendium,
    markFeatsWithPrerequisites,
    rewriteSpellToChatToSendLink,
} from "../feature/actorSheet/index.ts";
import { renderLearnFromScrollButtons } from "../feature/spells/learn/scrollSheetInjection.ts";

export function renderActorSheetHook(sheet: ActorSheetPF2e<ActorPF2e>, element: unknown): void {
    const html = extractHtmlElement(element);
    if (!html || !sheet.actor) return;
    const actor = sheet.actor;

    const rarityColorConfigs = [
        {
            setting: "playerSpellsRarityColour",
            listSelector: ".spell-list",
            itemSelector: ".spell",
            fetchItem: (el: Element) => itemFromActor(el, "data-item-id", actor),
        },
        {
            setting: "playerFeatsRarityColour",
            listSelector: ".feats-pane",
            itemSelector: ".slot",
            fetchItem: (el: Element) => itemFromActor(el, "data-item-id", actor),
        },
        {
            setting: "playerCraftingRarityColour",
            listSelector: ".crafting-pane",
            itemSelector: ".formula-item",
            fetchItem: (el: Element) => itemFromCompendium(el, "data-item-uuid"),
        },
        {
            setting: "playerAbcdRarityColour",
            listSelector: ".abcd",
            itemSelector: ".detail",
            fetchItem: (el: Element) =>
                itemFromActor(el.querySelector(".detail-item-control") ?? el, "data-item-id", actor),
            headingSelector: "h3" as const,
        },
    ];
    for (const cfg of rarityColorConfigs) {
        colorActorItemsByRarity({ html, actor, ...cfg });
    }

    markFeatsWithPrerequisites(html, actor);
    rewriteSpellToChatToSendLink(sheet, html);

    if (getModuleSetting("showCharacterOglTag")) {
        addOglTagToCharacterSheet(html, actor);
    }

    if (getModuleSetting<boolean>("enableGeneralLearnSpell")) {
        renderLearnFromScrollButtons(sheet, element);
    }
}
