import type { ActorPF2e } from "@actor";
import { type ModifierPF2e } from "@actor/modifiers.ts";
import { BaseStatisticData, BaseStatisticTraceData, StatisticData } from "./data.ts";
/** Basic data forming any Pathfinder statistic */
declare abstract class BaseStatistic<TActor extends ActorPF2e> {
    /** The actor to which this statistic belongs */
    actor: TActor;
    /** A stable but human-readable identifier */
    slug: string;
    /** A display label */
    label: string;
    /** Original construction arguments */
    protected data: StatisticData;
    /** String category identifiers: used to retrieve modifiers and other synthetics as well as create roll options  */
    domains: string[];
    /** Penalties, bonuses, and actual modifiers comprising a total modifier value */
    modifiers: ModifierPF2e[];
    constructor(actor: TActor, data: BaseStatisticData);
    createRollOptions(domains?: string[]): Set<string>;
    abstract getTraceData(): BaseStatisticTraceData;
}
export { BaseStatistic };
