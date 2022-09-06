import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ModifierPF2e } from "./modifiers";
/** Find the lowest multiple attack penalty for an attack with a given item */
declare function calculateMAPs(item: ItemPF2e, { domains, options }: {
    domains: string[];
    options: Set<string> | string[];
}): MAPData;
/** Determine range penalty for a ranged attack roll */
declare function calculateRangePenalty(actor: ActorPF2e, increment: number | null, selectors: string[], rollOptions: Set<string>): ModifierPF2e | null;
interface MAPData {
    label: string;
    map1: number;
    map2: number;
}
export { calculateMAPs, calculateRangePenalty };
