import { ActorPF2e, CombatantPF2e } from "foundry-pf2e";
import { actorHasItemBySlug, getModuleFlag, minionsInCurrentScene, shouldIHandleThis } from "../../utils.ts";

export async function reduceFrightened(combatant: CombatantPF2e, userId: string): Promise<void> {
    if (!combatant || !combatant.actor || (userId !== game.user.id && !shouldIHandleThis(combatant.actor))) {
        return;
    }

    const actors: ActorPF2e[] = [combatant.actor, ...minionsInCurrentScene(combatant.actor)];

    for (const actor of actors) {
        const minimumFrightened = getModuleFlag(actor, "condition.frightened.min", 0);
        const frightened = actor.getCondition("frightened");
        const currentFrightened = frightened?.value ?? 0;
        const doubleFrightenReductionSlugs: string[] = [
            "dwarven-doughtiness",
            "calm-and-centered"
        ]

        if (frightened && currentFrightened > 0 && !frightened.isLocked) {
            const reduceBy = doubleFrightenReductionSlugs.some((slug) => actorHasItemBySlug(actor, slug)) ? 2 : 1;

            for (let i = 0; i < reduceBy && currentFrightened - i > minimumFrightened; i++) {
                await actor.decreaseCondition("frightened");
            }
        }
    }
}
