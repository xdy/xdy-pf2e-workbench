export async function moveSelectedAheadOfCurrent(selectedCombatant: Combatant): Promise<void> {
    //TODO Ugly hack, might want to do a PR to expose the code in encounter-tracker#setInitiativeFromDrop?
    //TODO Handle moving several tokens at once? For now, just take the first selected token.
    const combat = (game as Game)?.combat;
    if (combat && selectedCombatant && selectedCombatant !== combat?.combatant) {
        const previous = combat?.combatants
            .map((c) => ({
                initiative: c.initiative || 0,
            }))
            .sort((a, b) => a.initiative - b.initiative)
            .find((c) => {
                return c.initiative > <number>combat?.combatant?.initiative;
            })?.initiative;
        const current = <number>combat?.combatant?.initiative;
        const initiative = !previous || previous < current ? current + 2 : <number>((previous + current) / 2);
        await combat?.setInitiative(<string>selectedCombatant?.id, initiative);
    }
}

export function getCombatantById(combatantId: any) {
    return <Combatant>(game as Game)?.combat?.getCombatantByToken(
        <string>(game as Game)?.combat?.combatants
            .map((c) => ({
                id: <string>c.id,
                tokenId: <string>c.token?.id,
            }))
            .find((c) => {
                return c.id === combatantId;
            })?.tokenId
    );
}
