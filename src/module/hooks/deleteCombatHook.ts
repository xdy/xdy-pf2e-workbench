import { EncounterPF2e, PhysicalItemPF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { sendHeldItemChatMessage } from "../utils.js";
import { clearToolbeltCaches } from "../feature/damageHandler/toolbeltIntegration.ts";

export async function deleteCombatHook(encounter: EncounterPF2e, _options: object): Promise<void> {
    clearToolbeltCaches();

    if (game.settings.get(MODULENAME, "sheatheHeldItemsAfterEncounter")) {
        await sheatheHeldItemsAfterEncounter(encounter);
    }
}

async function sheatheHeldItemsAfterEncounter(encounter: EncounterPF2e) {
    const itemTypes = String(game.settings.get(MODULENAME, "sheatheHeldItemsAfterEncounterTypes"))
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

    for (const combatant of encounter.combatants) {
        const actor = combatant.actor;
        if (!actor) {
            continue;
        }
        // @ts-expect-error TODO fix typing
        const items = <PhysicalItemPF2e[]>actor.items?.filter((i) => i.isHeld);
        if (!items || items.length === 0) {
            continue;
        }

        const itemsToSheathe = items.filter((i) => itemTypes.includes(i.type));
        if (itemsToSheathe.length > 0) {
            for (const item of itemsToSheathe) {
                // @ts-expect-error TODO fix typing
                await actor.changeCarryType(item, { carryType: "worn", handsHeld: 0, inSlot: false });
            }
            sendHeldItemChatMessage(
                actor,
                itemsToSheathe,
                `${MODULENAME}.SETTINGS.sheatheHeldItemsAfterEncounter.message`,
                "sheatheHeldItems ChatMessage",
            );
        }
    }
}
