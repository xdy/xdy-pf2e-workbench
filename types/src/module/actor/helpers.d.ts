import { ActorPF2e } from "@actor";
import { ItemPF2e, MeleePF2e } from "@item";
import { ActorSourcePF2e } from "./data";
import { ModifierPF2e } from "./modifiers";
import { NPCStrike } from "./npc/data";
import { AttackItem } from "./types";
/** Reset and rerender a provided list of actors. Omit argument to reset all world and synthetic actors */
declare function resetAndRerenderActors(actors?: Iterable<ActorPF2e>): Promise<void>;
declare function migrateActorSource(source: PreCreate<ActorSourcePF2e>): Promise<ActorSourcePF2e>;
/** Find the lowest multiple attack penalty for an attack with a given item */
declare function calculateMAPs(item: ItemPF2e, { domains, options }: {
    domains: string[];
    options: Set<string> | string[];
}): MAPData;
/** Create a strike statistic from a melee item: for use by NPCs and Hazards */
declare function strikeFromMeleeItem(item: Embedded<MeleePF2e>): NPCStrike;
/** Get the range increment of a target for a given weapon */
declare function getRangeIncrement(attackItem: AttackItem, distance: number | null): number | null;
/** Determine range penalty for a ranged attack roll */
declare function calculateRangePenalty(actor: ActorPF2e, increment: number | null, selectors: string[], rollOptions: Set<string>): ModifierPF2e | null;
/** Whether this actor is of a the "character" type, excluding those from the PF2E Companion Compendia module */
declare function isReallyPC(actor: ActorPF2e): boolean;
interface MAPData {
    label: string;
    map1: number;
    map2: number;
}
export { calculateMAPs, calculateRangePenalty, isReallyPC, getRangeIncrement, migrateActorSource, resetAndRerenderActors, strikeFromMeleeItem, };
