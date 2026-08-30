import { EncounterPF2e, PhysicalItemPF2e } from "foundry-pf2e";
import { MODULENAME } from "../constants.ts";
import { getModuleSetting, sendHeldItemChatMessage } from "../utils.ts";
import { clearToolbeltCaches } from "../feature/damageHandler/toolbelt/toolbeltCache.ts";

export async function deleteCombatHook(encounter: EncounterPF2e, _options: object): Promise<void> {
    clearToolbeltCaches();

    if (getModuleSetting("sheatheHeldItemsAfterEncounter")) {
        await sheatheHeldItemsAfterEncounter(encounter);
    }
}

async function sheatheHeldItemsAfterEncounter(encounter: EncounterPF2e) {
    const itemTypes = getModuleSetting<string>("sheatheHeldItemsAfterEncounterTypes")
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

    for (const combatant of encounter.combatants) {
        if (combatant.isDefeated) {
            continue;
        }

        const actor = combatant.actor;
        if (!actor) {
            continue;
        }

        const items = actor.items?.filter((i) => i.isOfType("physical") && i.isHeld && i.handsHeld > 0);
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
                <PhysicalItemPF2e[]>itemsToSheathe,
                `${MODULENAME}.SETTINGS.sheatheHeldItemsAfterEncounter.message`,
                "sheatheHeldItems ChatMessage",
            );
        }
    }
}
