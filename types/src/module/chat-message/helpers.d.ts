import { ChatContextFlag, CheckRollContextFlag } from "./data";
import { ChatMessagePF2e } from "./document";
declare function isCheckContextFlag(flag?: ChatContextFlag): flag is CheckRollContextFlag;
declare function applyDamageFromMessage({ message, multiplier, addend, promptModifier, rollIndex, }: ApplyDamageFromMessageParams): Promise<void>;
interface ApplyDamageFromMessageParams {
    message: ChatMessagePF2e;
    multiplier?: number;
    addend?: number;
    promptModifier?: boolean;
    rollIndex?: number;
}
export { isCheckContextFlag, applyDamageFromMessage };
