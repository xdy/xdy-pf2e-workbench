import type { ActorPF2e } from "foundry-pf2e";
import { MODULENAME } from "../constants.ts";
import { getOwningUserId, isActorAssignedToCurrentUser } from "../utils.ts";

export function dispatchToCombatantOwner(
    actor: ActorPF2e,
    combatantId: string,
    operation: "combatTurnStart" | "combatTurnEnd",
    runLocally: () => void,
): void {
    if (isActorAssignedToCurrentUser(actor)) {
        runLocally();
        return;
    }

    const targetUserId = getOwningUserId(actor);
    if (targetUserId && game.user.isGM) {
        game.socket.emit("module." + MODULENAME, {
            operation,
            combatantId,
            targetUserId,
        });
    }
}
