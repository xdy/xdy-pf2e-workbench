import { ActorPF2e, ActorSheetPF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { extractHtmlElement } from "../utils.js";
import { addOglTagToCharacterSheet } from "../feature/characterOglContent/index.js";
import {
    colorActorItemsByRarity,
    itemFromActor,
    itemFromCompendium,
    markFeatsWithPrerequisites,
    rewriteSpellToChatToSendLink,
} from "../feature/actorSheet/index.js";

export function renderActorSheetHook(sheet: ActorSheetPF2e<ActorPF2e>, element: unknown): void {
    const html = extractHtmlElement(element);
    if (!html || !sheet.actor) return;
    const actor = sheet.actor;

    colorActorItemsByRarity({
        html,
        actor,
        setting: "playerSpellsRarityColour",
        listSelector: ".spell-list",
        itemSelector: ".spell",
        fetchItem: (el) => itemFromActor(el, "data-item-id", actor),
    });
    colorActorItemsByRarity({
        html,
        actor,
        setting: "playerFeatsRarityColour",
        listSelector: ".feats-pane",
        itemSelector: ".slot",
        fetchItem: (el) => itemFromActor(el, "data-item-id", actor),
    });
    colorActorItemsByRarity({
        html,
        actor,
        setting: "playerCraftingRarityColour",
        listSelector: ".crafting-pane",
        itemSelector: ".formula-item",
        fetchItem: (el) => itemFromCompendium(el, "data-item-uuid"),
    });
    colorActorItemsByRarity({
        html,
        actor,
        setting: "playerAbcdRarityColour",
        listSelector: ".abcd",
        itemSelector: ".detail",
        fetchItem: (el) => itemFromActor(el.querySelector(".detail-item-control") ?? el, "data-item-id", actor),
        headingSelector: "h3",
    });

    markFeatsWithPrerequisites(html, actor);
    rewriteSpellToChatToSendLink(sheet, html);

    if (game.settings.get(MODULENAME, "showCharacterOglTag")) {
        addOglTagToCharacterSheet(html, actor);
    }
}
