import type { ConditionPF2e, EffectPF2e } from "@item";
import { EffectTrait } from "@item/abstract-effect/types.ts";
import { ChatMessagePF2e } from "@module/chat-message/document.ts";
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
export declare function createToggleEffectMacro(effect: ConditionPF2e | EffectPF2e, slot: number): Promise<void>;
interface RollActionMacroParams {
    actorUUID?: ActorUUID;
    itemId?: string;
    slug?: string;
    elementTrait?: EffectTrait;
    type?: "blast" | "strike";
}
export {};
