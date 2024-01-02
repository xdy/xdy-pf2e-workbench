import type { ActorPF2e } from "@actor";
import { SenseData } from "@actor/creature/data.ts";
import { Sense } from "@actor/creature/sense.ts";
import type { StatisticData, StatisticTraceData } from "./data.ts";
import { Statistic, type RollOptionConfig } from "./statistic.ts";
declare class PerceptionStatistic extends Statistic {
    #private;
    /** Special senses possessed by the actor */
    senses: Collection<Sense>;
    /** Whether the actor has standard vision */
    hasVision: boolean;
    /** Special senses or other perception-related details without formalization in the system: used for NPCs */
    details?: string;
    constructor(actor: ActorPF2e, data: PerceptionStatisticData, config?: RollOptionConfig);
    getTraceData(): PerceptionTraceData;
}
interface PerceptionStatisticData extends StatisticData {
    senses: SenseData[];
    vision?: boolean;
    details?: string;
}
type LabeledSenseData = Required<SenseData> & {
    label: string | null;
};
interface PerceptionTraceData extends StatisticTraceData {
    /** Unusual senses or other perception-related notes */
    details: string;
    senses: LabeledSenseData[];
    /** Whether the creature has standard vision */
    vision: boolean;
}
export { PerceptionStatistic, type PerceptionTraceData };
