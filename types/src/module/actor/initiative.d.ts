import { ActorPF2e } from "@module/documents";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { CheckRoll } from "@system/check";
import { RollParameters } from "@system/rolls";
import { Statistic } from "@system/statistic";
import { AbilityString } from "./types";
interface InitiativeRollResult {
    combatant: CombatantPF2e<EncounterPF2e>;
    roll: Rolled<CheckRoll>;
}
interface InitiativeRollParams extends RollParameters {
    /** Whether the encounter tracker should be updated with the roll result */
    updateTracker?: boolean;
    skipDialog?: boolean;
    rollMode?: RollMode | "roll";
}
/** A statistic wrapper used to roll initiative for actors */
declare class ActorInitiative {
    actor: ActorPF2e;
    statistic: Statistic;
    get ability(): AbilityString | null;
    constructor(creature: ActorPF2e, statistic: Statistic);
    roll(args?: InitiativeRollParams): Promise<InitiativeRollResult | null>;
}
export { ActorInitiative, InitiativeRollResult };
