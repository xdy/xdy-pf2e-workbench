import type { SkillAbbreviation } from "@actor/creature/data.ts";
import type { ConditionPF2e, EffectPF2e } from "@item";
import { ChatMessagePF2e } from "@module/chat-message/document.ts";
import type { ElementTrait } from "@scripts/config/traits.ts";
/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param itemId
 */
export declare function rollItemMacro(itemId: string, event?: Event | null): Promise<ChatMessagePF2e | null>;
export declare function createActionMacro({ actorUUID, actionIndex, elementTrait, slot, }: {
    actorUUID?: ActorUUID;
    elementTrait?: string;
    actionIndex?: number;
    slot: number;
}): Promise<void>;
export declare function rollActionMacro({ actorUUID, itemId, elementTrait, slug, type, }: RollActionMacroParams): Promise<ChatMessagePF2e | undefined>;
export declare function createSkillMacro(skill: SkillAbbreviation, skillName: string, actorId: string, slot: number): Promise<void>;
export declare function createToggleEffectMacro(effect: ConditionPF2e | EffectPF2e, slot: number): Promise<void>;
interface RollActionMacroParams {
    actorUUID?: ActorUUID;
    itemId?: string;
    slug?: string;
    elementTrait?: ElementTrait;
    type?: "blast" | "strike";
}
export {};
