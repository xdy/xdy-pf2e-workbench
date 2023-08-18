import { ActorPF2e } from "@actor";
import { ItemPF2e, MeleePF2e } from "@item";
import { ActorSourcePF2e } from "./data/index.ts";
import { ModifierPF2e } from "./modifiers.ts";
import { NPCStrike } from "./npc/data.ts";
import { AttackItem } from "./types.ts";
/** Reset and rerender a provided list of actors. Omit argument to reset all world and synthetic actors */
declare function resetActors(actors?: Iterable<ActorPF2e>, { rerender }?: {
    rerender?: boolean | undefined;
}): Promise<void>;
declare function migrateActorSource(source: PreCreate<ActorSourcePF2e>): Promise<ActorSourcePF2e>;
/** Review `removeOnExit` aura effects and remove any that no longer apply */
declare function checkAreaEffects(this: ActorPF2e): Promise<void>;
/**  Set a roll option for HP remaining and percentage remaining */
declare function setHitPointsRollOptions(actor: ActorPF2e): void;
/** Find the lowest multiple attack penalty for an attack with a given item */
declare function calculateMAPs(item: ItemPF2e, { domains, options }: {
    domains: string[];
    options: Set<string> | string[];
}): MAPData;
/** Create roll options pertaining to the active encounter and the actor's participant */
declare function createEncounterRollOptions(actor: ActorPF2e): Record<string, boolean>;
/** Whether flanking puts this actor off-guard */
declare function isOffGuardFromFlanking(target: ActorPF2e, origin: ActorPF2e): boolean;
/** Create a strike statistic from a melee item: for use by NPCs and Hazards */
declare function strikeFromMeleeItem(item: MeleePF2e<ActorPF2e>): NPCStrike;
/** Get the range increment of a target for a given weapon */
declare function getRangeIncrement(attackItem: AttackItem, distance: number | null): number | null;
/** Determine range penalty for a ranged attack roll */
declare function calculateRangePenalty(actor: ActorPF2e, increment: number | null, selectors: string[], rollOptions: Set<string>): ModifierPF2e | null;
/** Whether this actor is of a the "character" type, excluding those from the PF2E Companion Compendia module */
declare function isReallyPC(actor: ActorPF2e): boolean;
interface MAPData {
    slug: "multiple-attack-penalty";
    label: string;
    map1: number;
    map2: number;
}
export { calculateMAPs, calculateRangePenalty, checkAreaEffects, createEncounterRollOptions, getRangeIncrement, isOffGuardFromFlanking, isReallyPC, migrateActorSource, resetActors, setHitPointsRollOptions, strikeFromMeleeItem, };
