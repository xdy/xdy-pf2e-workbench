import type { ActorPF2e } from "@actor/base";
import { EncounterPF2e } from ".";
declare class CombatantPF2e<TParent extends EncounterPF2e | null = EncounterPF2e | null, TActor extends ActorPF2e | null = ActorPF2e | null> extends Combatant<TParent, TActor> {
    get encounter(): TParent;
    /** The round this combatant last had a turn */
    get roundOfLastTurn(): number | null;
    /** Can the user see this combatant's name? */
    get playersCanSeeName(): boolean;
    overridePriority(initiative: number): number | null;
    hasHigherInitiative(this: RolledCombatant<NonNullable<TParent>>, { than }: {
        than: RolledCombatant<NonNullable<TParent>>;
    }): boolean;
    startTurn(): Promise<void>;
    endTurn(options: {
        round: number;
    }): Promise<void>;
    prepareBaseData(): void;
    /** Toggle the defeated status of this combatant, applying or removing the overlay icon on its token */
    toggleDefeated(): Promise<void>;
    /**
     * Hide the tracked resource if the combatant represents a non-player-owned actor
     * @todo Make this a configurable with a metagame-knowledge setting
     */
    updateResource(): {
        value: number;
    } | null;
    _getInitiativeFormula(): string;
    /** Toggle the visibility of names to players */
    toggleNameVisibility(): Promise<void>;
    /** Send out a message with information on an automatic effect that occurs upon an actor's death */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<this>, userId: string): void;
}
interface CombatantPF2e<TParent extends EncounterPF2e | null = EncounterPF2e | null, TActor extends ActorPF2e | null = ActorPF2e | null> extends Combatant<TParent, TActor> {
    flags: CombatantFlags;
}
type CombatantFlags = {
    pf2e: {
        roundOfLastTurn: number | null;
        roundOfLastTurnEnd: number | null;
        overridePriority: Record<number, number | undefined>;
    };
    [key: string]: unknown;
};
type RolledCombatant<TEncounter extends EncounterPF2e> = CombatantPF2e<TEncounter> & {
    get initiative(): number;
};
export { CombatantPF2e, RolledCombatant };
