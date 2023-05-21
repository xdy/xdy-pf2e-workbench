import { SkillAbbreviation } from "@actor/creature/data.ts";
import { ItemPF2e, EffectPF2e } from "@item";
/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param itemId
 */
export declare function rollItemMacro(itemId: string): ReturnType<ItemPF2e["toChat"]> | void;
export declare function createActionMacro(actionIndex: number, slot: number): Promise<void>;
export declare function rollActionMacro(itemId: string, _actionIndex: number, actionSlug: string): Promise<void>;
export declare function createSkillMacro(skill: SkillAbbreviation, skillName: string, actorId: string, slot: number): Promise<void>;
export declare function createToggleEffectMacro(effect: EffectPF2e, slot: number): Promise<void>;
