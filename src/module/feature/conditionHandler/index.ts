import { ActorPF2e, CombatantPF2e } from "foundry-pf2e";
import { minionsInCurrentScene, shouldIHandleThis } from "../../utils.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

export async function reduceFrightened(combatant: CombatantPF2e, userId: string) {
    if (!combatant || !combatant.actor || (userId !== game.user.id && !shouldIHandleThis(combatant.actor))) {
        return;
    }

    const actors: ActorPF2e[] = [combatant.actor, ...minionsInCurrentScene(combatant.actor)];

    for (const actor of actors) {
        const minimumFrightened = <number>(actor?.getFlag(MODULENAME, "condition.frightened.min") ?? 0);
        const frightened = actor.getCondition("frightened");
        const currentFrightened = frightened?.value ?? 0;

        if (frightened && currentFrightened > 0 && !frightened.isLocked) {
            const reduceBy = actor.itemTypes.feat.some((feat) => feat.slug === "dwarven-doughtiness") ? 2 : 1;

            for (let i = 0; i < reduceBy && currentFrightened - i > minimumFrightened; i++) {
                await actor.decreaseCondition("frightened");
            }
        }
    }
}
