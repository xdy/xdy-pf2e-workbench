import { ChatContextFlag, CheckRollContextFlag } from "./data.ts";
import { ChatMessagePF2e } from "./document.ts";
declare function isCheckContextFlag(flag?: ChatContextFlag): flag is CheckRollContextFlag;
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
export { applyDamageFromMessage, isCheckContextFlag, toggleClearTemplatesButton };
