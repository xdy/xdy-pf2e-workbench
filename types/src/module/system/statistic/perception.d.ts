import type { ActorPF2e, CreaturePF2e } from "@actor";
import { SenseData } from "@actor/creature/data.ts";
import { Sense } from "@actor/creature/sense.ts";
import { AttributeString } from "@actor/types.ts";
import type { StatisticData, StatisticTraceData } from "./data.ts";
import { Statistic, type RollOptionConfig } from "./statistic.ts";
declare class PerceptionStatistic<TActor extends ActorPF2e = ActorPF2e> extends Statistic<TActor> {
    #private;
    /** Special senses possessed by the actor */
    senses: Collection<Sense>;
    /** Whether the actor has standard vision */
    hasVision: boolean;
    /** Special senses or other perception-related details without formalization in the system: used for NPCs */
    details?: string;
    constructor(actor: TActor, data: PerceptionStatisticData, config?: RollOptionConfig);
    getTraceData(this: Statistic<CreaturePF2e>): PerceptionTraceData<AttributeString>;
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
interface PerceptionTraceData<TAttribute extends AttributeString | null = AttributeString | null> extends StatisticTraceData<TAttribute> {
    /** Unusual senses or other perception-related notes */
    details: string;
    senses: LabeledSenseData[];
    /** Whether the creature has standard vision */
    vision: boolean;
}
export { PerceptionStatistic, type PerceptionTraceData };
