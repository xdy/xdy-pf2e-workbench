import type { ActorPF2e } from "@actor";
import { InitiativeData } from "@actor/data/base.ts";
import { ZeroToTwo } from "@module/data.ts";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.ts";
import { CheckRoll } from "@system/check/index.ts";
import { Statistic, StatisticRollParameters, StatisticTraceData } from "@system/statistic/index.ts";
import { AttributeString } from "./types.ts";
interface InitiativeRollResult {
    combatant: CombatantPF2e<EncounterPF2e>;
    roll: Rolled<CheckRoll>;
}
interface InitiativeRollParams extends StatisticRollParameters {
    combatant?: CombatantPF2e<EncounterPF2e>;
    /** Whether the encounter tracker should be updated with the roll result */
    updateTracker?: boolean;
}
/** A statistic wrapper used to roll initiative for actors */
declare class ActorInitiative {
    actor: ActorPF2e;
    statistic: Statistic;
    tiebreakPriority: ZeroToTwo;
    constructor(actor: ActorPF2e, { statistic, tiebreakPriority }: {
        statistic: string;
        tiebreakPriority: ZeroToTwo;
    });
    get attribute(): AttributeString | null;
    get mod(): number;
    roll(args?: InitiativeRollParams): Promise<InitiativeRollResult | null>;
    getTraceData(): InitiativeTraceData;
}
type InitiativeTraceData = StatisticTraceData & InitiativeData;
export { ActorInitiative };
export type { InitiativeRollResult, InitiativeTraceData };
