import { CombatantPF2e } from "@module/encounter";
import { shouldIHandleThis } from "../../utils";

export async function reduceFrightened(combatant: CombatantPF2e) {
    if (combatant && combatant.actor && shouldIHandleThis(combatant.isOwner ? game.user?.id : null)) {
        if (combatant.actor.hasCondition("frightened")) {
            await combatant.actor.decreaseCondition("frightened");
        }
    }
}
