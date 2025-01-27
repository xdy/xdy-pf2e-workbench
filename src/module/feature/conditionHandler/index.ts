import { ActorPF2e, CombatantPF2e } from "foundry-pf2e";
import { minionsInCurrentScene, shouldIHandleThis } from "../../utils.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

const FRIGHTENED = "frightened";
const DWARVEN_DOUGHTINESS = "dwarven-doughtiness";

export async function reduceFrightened(combatant: CombatantPF2e, userId: string) {
    if (!combatant || !combatant.actor || (userId !== game.user.id && !shouldIHandleThis(combatant.actor))) {
        return;
    }

    const actorsToProcess: ActorPF2e[] = [combatant.actor, ...minionsInCurrentScene(combatant.actor)];

    for (const actor of actorsToProcess) {
        await processFrightenedActor(actor);
    }
}

async function processFrightenedActor(actor: ActorPF2e): Promise<void> {
    const minimumFrightened = Number(actor?.getFlag(MODULENAME, "condition.frightened.min") ?? 0);
    const reduceBy = actor.itemTypes.feat.some((feat) => feat.slug === DWARVEN_DOUGHTINESS) ? 2 : 1;

    let frightenedCondition = actor.getCondition(FRIGHTENED);
    while (
        frightenedCondition &&
        frightenedCondition.value &&
        frightenedCondition.value > minimumFrightened &&
        !frightenedCondition.isLocked
    ) {
        for (let i = 0; i < reduceBy && frightenedCondition.value - i > minimumFrightened; i++) {
            await actor.decreaseCondition(FRIGHTENED);
        }
        frightenedCondition = actor.getCondition(FRIGHTENED);
    }
}
