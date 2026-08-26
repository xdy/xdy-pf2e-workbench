import type { ActorPF2e, ActorSheetPF2e, ItemPF2e, SpellPF2e } from "foundry-pf2e";
import { fireAndForget } from "../../../utils.ts";
import { I18N_LEARN } from "../helpers.ts";
import { isMystified, isScrollWithSpell } from "../itemPredicates.ts";
import { getEmbeddedScrollSpell, learnSpellFromScroll } from "./scrollCreateIntercept.ts";
import { hasSpontaneousEntry, isSpellAlreadyKnownSync } from "../spellActorQueries.ts";
import { spellIdentifier } from "../spellData.ts";

function isScrollSpellAlreadyKnown(scroll: ItemPF2e, actor: ActorPF2e): boolean {
    const embedded = getEmbeddedScrollSpell(scroll);
    if (!embedded) return false;
    const ident = spellIdentifier(embedded as unknown as SpellPF2e);
    return ident ? isSpellAlreadyKnownSync(actor, ident) : false;
}

function shouldShowButton(scroll: ItemPF2e, actor: ActorPF2e): boolean {
    if (!isScrollWithSpell(scroll)) return false;
    if (isMystified(scroll)) return false;

    return !(isScrollSpellAlreadyKnown(scroll, actor) && hasSpontaneousEntry(actor));
}

export function renderLearnFromScrollButtons(sheet: ActorSheetPF2e<ActorPF2e>, _html: unknown): void {
    const actor = sheet.actor;
    if (actor.type !== "character") return;

    const inventoryTab = sheet.element[0]?.querySelector<HTMLElement>('.tab.inventory[data-tab="inventory"]');
    if (!inventoryTab) return;

    const itemRows = inventoryTab.querySelectorAll<HTMLElement>("li[data-item-id]");
    for (const row of itemRows) {
        const itemId = row.dataset.itemId;
        if (!itemId) continue;

        const controls = row.querySelector<HTMLElement>(".item-controls");
        if (!controls) continue;

        if (controls.querySelector(".learn-from-scroll-btn")) continue;

        const scroll = actor.items.get(itemId) as ItemPF2e | undefined;
        if (!scroll || !shouldShowButton(scroll, actor)) continue;

        const button = document.createElement("a");
        button.classList.add("learn-from-scroll-btn");
        button.dataset.tooltip = game.i18n.localize(`${I18N_LEARN}.learnFromScrollButton`);
        button.innerHTML = '<i class="fa-solid fa-book-open fa-fw"></i>';

        button.addEventListener("click", () => {
            fireAndForget(learnSpellFromScroll(scroll, actor), "learnFromScroll: buttonClick");
        });

        const deleteBtn = controls.querySelector<HTMLElement>('[data-action="delete-item"]');
        if (deleteBtn) {
            deleteBtn.insertAdjacentElement("beforebegin", button);
        } else {
            controls.appendChild(button);
        }
    }
}
