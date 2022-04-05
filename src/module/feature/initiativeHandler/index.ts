import { MODULENAME } from "../../xdy-pf2e-workbench";
import { CombatantPF2e } from "@module/encounter";
import { ActorPF2e } from "@actor";
import { TokenDocumentPF2e } from "@scene";

type UpdateRow = { type: string; data: { active: any; slug: string; value: { value: number } } };

export async function moveSelectedAheadOfCurrent(selectedCombatant: CombatantPF2e): Promise<void> {
    //TODO Ugly hack, might want to do a PR to expose the code in encounter-tracker#setInitiativeFromDrop?
    //TODO Handle moving several tokens at once? For now, just take the first selected token.
    const combat = game?.combat;
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

export async function moveOnZeroHP(actor: ActorPF2e, update: Record<string, string>): Promise<void> {
    if (game.user?.isGM && game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP" && game.combat) {
        const combatant = <CombatantPF2e>(
            game.combat.getCombatantByToken(
                actor.isToken
                    ? <string>actor.token?.id
                    : <string>canvas?.scene?.data.tokens.find((t) => t.actor?.id === actor.id)?.id
            )
        );
        if (
            combatant &&
            combatant !== game.combat.combatant &&
            // @ts-ignore
            actor.data.data.attributes.hp.value > 0 &&
            getProperty(update, "data.attributes.hp.value") <= 0
        ) {
            await moveSelectedAheadOfCurrent(combatant);
        }
    }
}

export async function moveOnDying(tokenDoc: TokenDocumentPF2e, update): Promise<void> {
    if (
        game.user?.isGM &&
        game.settings.get(MODULENAME, "enableAutomaticMove") === "deprecatedGettingStatusDying" &&
        game.combat &&
        tokenDoc.actor &&
        update.actorData
    ) {
        const shouldMove =
            !tokenDoc.actor.hasCondition("dying") &&
            update.actorData.items &&
            update.actorData.items
                .filter((row: UpdateRow) => row.type === "condition")
                .filter((row: UpdateRow) => row.data.active)
                .filter((row: UpdateRow) => row.data.slug === "dying")
                .find((row: UpdateRow) => row.data.value.value === 1);
        const combatant = <CombatantPF2e>game.combat.getCombatantByToken(<string>tokenDoc.id);
        if (combatant && combatant !== game.combat.combatant && shouldMove) {
            await moveSelectedAheadOfCurrent(combatant);
        }
    }
}

export function getCombatantById(combatantId: any): CombatantPF2e<ActorPF2e | null> {
    return <CombatantPF2e>game?.combat?.getCombatantByToken(
        <string>game?.combat?.combatants
            .map((c) => ({
                id: <string>c.id,
                tokenId: <string>c.token?.id,
            }))
            .find((c) => {
                return c.id === combatantId;
            })?.tokenId
    );
}

export function deprecatedMoveManually(entryOptions: any): void {
    if (game.user?.isGM && game.settings.get(MODULENAME, "enableAutomaticMove") === "deprecatedManually") {
        entryOptions.push({
            icon: '<i class="fas fa-skull"></i>',
            name: `${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantContextMenu.name`,
            callback: async (li: any) => {
                await moveSelectedAheadOfCurrent(getCombatantById(li.data("combatant-id")));
            },
        });
    }
}
