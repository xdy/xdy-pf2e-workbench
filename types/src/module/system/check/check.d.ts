/// <reference types="jquery" />
import { ChatMessagePF2e } from "@module/chat-message";
import { CheckModifier } from "@actor/modifiers";
import { CheckRoll } from "./roll";
import { DegreeOfSuccessString } from "../degree-of-success";
import { CheckRollContext } from "./types";
interface RerollOptions {
    heroPoint?: boolean;
    keep?: "new" | "best" | "worst";
}
type CheckRollCallback = (roll: Rolled<CheckRoll>, outcome: DegreeOfSuccessString | null | undefined, message: ChatMessagePF2e) => Promise<void> | void;
declare class CheckPF2e {
    /** Roll the given statistic, optionally showing the check modifier dialog if 'Shift' is held down. */
    static roll(check: CheckModifier, context?: CheckRollContext, event?: JQuery.TriggeredEvent | null, callback?: CheckRollCallback): Promise<Rolled<CheckRoll> | null>;
    private static createTagFlavor;
    /** Reroll a rolled check given a chat message. */
    static rerollFromMessage(message: ChatMessagePF2e, { heroPoint, keep }?: RerollOptions): Promise<void>;
    /**
     * Renders the reroll, highlighting the old result if it was a critical success or failure
     * @param roll  The roll that is to be rerendered
     * @param isOld This is the old roll render, so remove damage or other buttons
     */
    static renderReroll(roll: Rolled<Roll>, { isOld }: {
        isOld: boolean;
    }): Promise<string>;
    private static createResultFlavor;
}
export { CheckPF2e, CheckRollCallback };
