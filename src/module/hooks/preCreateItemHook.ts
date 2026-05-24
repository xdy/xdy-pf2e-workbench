import { CreaturePF2e, ItemPF2e } from "foundry-pf2e";
import { CHARACTER_TYPE, MODULENAME } from "../xdy-pf2e-workbench.js";
import { sendHeldItemChatMessage } from "../utils.js";

export async function preCreateItemHook(item: ItemPF2e, _data: object, _options: object, _id: string): Promise<void> {
    if (
        item.type === "condition" &&
        item.slug === "unconscious" &&
        item.actor?.isOfType(CHARACTER_TYPE) &&
        game.settings.get(MODULENAME, "dropHeldItemsOnBecomingUnconscious")
    ) {
        dropHeldItemsOnBecomingUnconscious(item.actor);
    }
}

function dropHeldItemsOnBecomingUnconscious(actor: CreaturePF2e) {
    const items = actor.inventory.filter((i) => i.isHeld);
    if (items && items.length > 0) {
        for (const item of items) {
            if (item.traits.has("free-hand") || item.type === "shield" || item.traits.has("attached-to-shield")) {
                // Presumed to strapped to an arm/worn on a hand, so just unreadied instead of dropped
                actor.changeCarryType(item, { carryType: "worn", handsHeld: 0, inSlot: false });
            } else {
                actor.changeCarryType(item, { carryType: "dropped", handsHeld: 0, inSlot: false });
            }
        }
        sendHeldItemChatMessage(
            actor,
            items,
            `${MODULENAME}.SETTINGS.dropHeldItemsOnBecomingUnconscious.message`,
            "dropHeldItemsOnBecomingUnconscious ChatMessage",
        );
    }
}
