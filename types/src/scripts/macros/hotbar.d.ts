import { SkillAbbreviation } from "@actor/creature/data.ts";
import type { ConditionPF2e, EffectPF2e } from "@item";
import { ChatMessagePF2e } from "@module/chat-message/document.ts";
/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param itemId
 */
export declare function rollItemMacro(itemId: string): Promise<ChatMessagePF2e | undefined | void>;
export declare function createActionMacro(actionIndex: number, slot: number): Promise<void>;
export declare function rollActionMacro(itemId: string, _actionIndex: number, actionSlug: string): Promise<void>;
export declare function createSkillMacro(skill: SkillAbbreviation, skillName: string, actorId: string, slot: number): Promise<void>;
export declare function createToggleEffectMacro(effect: ConditionPF2e | EffectPF2e, slot: number): Promise<void>;
