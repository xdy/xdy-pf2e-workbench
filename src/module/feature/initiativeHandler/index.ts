import { ActorPF2e } from "foundry-pf2e";
import { shouldIHandleThis } from "../../utils.js";

/**
 * Moves the selected combatant ahead of the current combatant.
 *
 * @param {type} selectedCombatantId - The ID of the selected combatant.
 * @return {Promise<void>} A promise that resolves when the selected combatant has been moved.
 */
export async function moveSelectedAheadOfCurrent(selectedCombatantId): Promise<void> {
    // TODO Ugly hack, might want to do a PR to expose the code in encounter-tracker#setInitiativeFromDrop?
    // TODO Handle moving several tokens at once? For now, just take the first selected token.
    const combat = game?.combat;
    if (combat && selectedCombatantId && selectedCombatantId !== combat?.combatant?.id) {
        const previous = combat?.combatants
            .map((c) => ({
                initiative: c.initiative || 0,
            }))
            .sort((a, b) => a.initiative - b.initiative)
            .find((c) => {
                return c.initiative > <number>combat?.combatant?.initiative;
            })?.initiative;
        const current = <number>combat?.combatant?.initiative;
        const initiative = !previous || previous < current ? current + 2 : <number>((previous + current) / 2) || 0;
        await combat?.setInitiative(<string>selectedCombatantId, initiative);
    }
}

export function moveOnZeroHP(actor: ActorPF2e): void {
    const combatant = game.combat?.getCombatantByToken(
        actor.isToken
            ? <string>actor.token?.id
            : <string>canvas?.scene?.tokens?.find((t) => t.actor?.id === actor.id)?.id,
    );
    if (shouldIHandleThis(actor) && combatant && combatant.id !== game.combat?.combatant?.id) {
        moveSelectedAheadOfCurrent(combatant.id).then();
    }
}
