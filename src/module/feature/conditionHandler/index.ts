import { CombatantPF2e } from "@module/encounter";
import { shouldIHandleThis } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";

export async function reduceFrightened(combatant: CombatantPF2e) {
    if (combatant && combatant.actor && shouldIHandleThis(combatant.isOwner ? game.user?.id : null)) {
        if (combatant.actor.hasCondition("frightened")) {
            const minimumFrightened = <number>combatant.actor?.getFlag(MODULENAME, "condition.frightened.min") ?? 0;
            const currentFrightened = combatant.actor?.getCondition("frightened")?.value ?? 0;
            if (currentFrightened - 1 >= minimumFrightened) {
                await combatant.actor.decreaseCondition("frightened");
            }
        }
    }
}
