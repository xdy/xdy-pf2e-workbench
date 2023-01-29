import { ItemPF2e } from "@item/base";
import { ItemSourcePF2e } from "@item/data";
import { EffectPF2e } from "@item/effect";
import { SkillAbbreviation } from "@actor/creature/data";
/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param item     The item data
 * @param slot     The hotbar slot to use
 */
export declare function createItemMacro(item: ItemSourcePF2e, slot: number): Promise<void>;
/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param itemId
 */
export declare function rollItemMacro(itemId: string): ReturnType<ItemPF2e["toChat"]> | void;
export declare function createActionMacro(actionIndex: number, actorId: string, slot: number): Promise<void>;
export declare function rollActionMacro(actorId: string, _actionIndex: number, actionSlug: string): Promise<void>;
export declare function createSkillMacro(skill: SkillAbbreviation, skillName: string, actorId: string, slot: number): Promise<void>;
export declare function createToggleEffectMacro(effect: EffectPF2e, slot: number): Promise<void>;
