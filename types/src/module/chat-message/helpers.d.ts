import type { ActorPF2e } from "@actor";
import { AbilityItemPF2e, FeatPF2e } from "@item";
import { ChatContextFlag, CheckRollContextFlag } from "./data.ts";
import { ChatMessagePF2e } from "./document.ts";
declare function isCheckContextFlag(flag?: ChatContextFlag): flag is CheckRollContextFlag;
/** Create a message with collapsed action description and button to apply an effect */
declare function createSelfEffectMessage(item: AbilityItemPF2e<ActorPF2e> | FeatPF2e<ActorPF2e>): Promise<ChatMessagePF2e | undefined>;
declare function applyDamageFromMessage({ message, multiplier, addend, promptModifier, rollIndex, }: ApplyDamageFromMessageParams): Promise<void>;
interface ApplyDamageFromMessageParams {
    message: ChatMessagePF2e;
    multiplier?: number;
    addend?: number;
    promptModifier?: boolean;
    rollIndex?: number;
}
/**
 * Show or hide a clear-measured-template button on a message (applicable to spell cards with template-placed buttons).
 * The button will be shown if templates are placed and the user has ownership; otherwise it will be hidden.
 */
declare function toggleClearTemplatesButton(message: ChatMessagePF2e | null): void;
export { applyDamageFromMessage, createSelfEffectMessage, isCheckContextFlag, toggleClearTemplatesButton };
