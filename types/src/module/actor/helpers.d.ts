import { type ActorPF2e } from "@actor";
import type { ItemPF2e, MeleePF2e, PhysicalItemPF2e, WeaponPF2e } from "@item";
import { ZeroToFour } from "@module/data.ts";
import { ActorSourcePF2e } from "./data/index.ts";
import { ModifierPF2e } from "./modifiers.ts";
import { NPCStrike } from "./npc/data.ts";
import { ActorCommitData, AuraEffectData } from "./types.ts";

/**
 * Reset and rerender a provided list of actors. Omit argument to reset all world and synthetic actors
 * @param [actors] A list of actors to refresh: if none are provided, all world and synthetic actors are retrieved
 * @param [options] Render options for actor sheets and tokens
 * @param [options.sheets=true] Render actor sheets
 * @param [options.tokens=false] Redraw tokens
 */
declare function resetActors(actors?: Iterable<ActorPF2e>, options?: ResetActorsRenderOptions): Promise<void>;
interface ResetActorsRenderOptions {
    sheets?: boolean;
    tokens?: boolean;
}
/** Get the user color most appropriate for a provided actor */
declare function userColorForActor(actor: ActorPF2e): HexColorString;
declare function migrateActorSource(source: PreCreate<ActorSourcePF2e>): Promise<ActorSourcePF2e>;
/** Review `removeOnExit` aura effects and remove any that no longer apply */
declare function checkAreaEffects(this: ActorPF2e): Promise<void>;
declare function auraAffectsActor(data: AuraEffectData, origin: ActorPF2e, actor: ActorPF2e): boolean;
/**  Set a roll option for HP remaining and percentage remaining */
declare function setHitPointsRollOptions(actor: ActorPF2e): void;
/** Find the lowest multiple attack penalty for an attack with a given item */
declare function calculateMAPs(item: ItemPF2e, { domains, options }: {
    domains: string[];
    options: Set<string> | string[];
}): MultipleAttackPenaltyData;
interface MultipleAttackPenaltyData {
    slug: "multiple-attack-penalty";
    label: string;
    map1: number;
    map2: number;
}
/** Create roll options pertaining to the active encounter and the actor's participant */
declare function createEncounterRollOptions(actor: ActorPF2e): Record<string, boolean>;
/** Create roll options pertaining to the terrain the actor is currently in */
declare function createEnvironmentRollOptions(actor: ActorPF2e): Record<string, boolean>;
/** Whether flanking puts this actor off-guard */
declare function isOffGuardFromFlanking(target: ActorPF2e, origin: ActorPF2e): boolean;
declare function getStrikeAttackDomains(weapon: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>, proficiencyRank: ZeroToFour | null, baseRollOptions: string[] | Set<string>): string[];
declare function getStrikeDamageDomains(weapon: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>, proficiencyRank: ZeroToFour | null): string[];
/** Create a strike statistic from a melee item: for use by NPCs and Hazards */
declare function strikeFromMeleeItem(item: MeleePF2e<ActorPF2e>): NPCStrike;
/** Get the range increment of a target for a given weapon */
declare function getRangeIncrement(attackItem: ItemPF2e<ActorPF2e>, distance: number | null): number | null;
/** Determine range penalty for a ranged attack roll */
declare function calculateRangePenalty(actor: ActorPF2e, increment: number | null, selectors: string[], rollOptions: Set<string>): ModifierPF2e | null;
/** Whether this actor is of a the "character" type, excluding those from the PF2E Companion Compendia module */
declare function isReallyPC(actor: ActorPF2e): boolean;
/** Recursive generator function to iterate over all items and their sub items */
declare function iterateAllItems<T extends ActorPF2e>(document: T | PhysicalItemPF2e<T>): Generator<ItemPF2e<T>>;
/**
 * Transfer a list of items between actors, stacking equivalent helpers. Temporary until a proper inventory method exists
 * @param source the source actor
 * @param dest the destination actor
 * @param [itemFilterFn] an optional filter function called for each inventory item
 */
declare function transferItemsBetweenActors(source: ActorPF2e, dest: ActorPF2e, itemFilterFn?: (item: PhysicalItemPF2e) => boolean): Promise<void>;
/** Applies multiple batched updates to the actor, delaying rendering till the end */
declare function applyActorUpdate<T extends ActorPF2e>(actor: T, data: Partial<ActorCommitData<T>>, { render }?: {
    render?: boolean;
}): Promise<void>;
export { applyActorUpdate, auraAffectsActor, calculateMAPs, calculateRangePenalty, checkAreaEffects, createEncounterRollOptions, createEnvironmentRollOptions, getRangeIncrement, getStrikeAttackDomains, getStrikeDamageDomains, isOffGuardFromFlanking, isReallyPC, iterateAllItems, migrateActorSource, resetActors, setHitPointsRollOptions, strikeFromMeleeItem, transferItemsBetweenActors, userColorForActor, };
export type { MultipleAttackPenaltyData };
