import { CreaturePF2e, HazardPF2e, VehiclePF2e } from "@actor";
import { BaseStatistic, BaseStatisticTraceData } from "./index.ts";
declare class HitPointsStatistic extends BaseStatistic {
    #private;
    /** The actor's current hit points */
    value: number;
    /** The actor's maximum hit points, which is the "total modifier" of this statistic */
    max: number;
    /** Temporary hit points */
    temp: number;
    /** Whether the actor is healed by void healing and harmed by vitality damage */
    negativeHealing: boolean;
    /** Unrecoverable hit points: a number of lost hit points that cannot be healed by any means */
    unrecoverable: number;
    /** Additional, unstructured information affecting the actor's hit points */
    details: string;
    constructor(actor: CreaturePF2e | HazardPF2e | VehiclePF2e, { baseMax }?: {
        baseMax?: number;
    });
    get breakdown(): string;
    getTraceData(): HitPointsTraceData;
}
interface HitPointsTraceData extends BaseStatisticTraceData, Pick<HitPointsStatistic, "max" | "temp" | "negativeHealing" | "unrecoverable" | "details"> {
    /** The actor's current hit points */
    value: number;
}
export { HitPointsStatistic };
