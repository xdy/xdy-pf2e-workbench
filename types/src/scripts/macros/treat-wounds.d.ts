import type { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message/index.ts";
import type { ActionDefaultOptions } from "@system/action-macros/index.ts";
import { type DegreeOfSuccessString } from "@system/degree-of-success.ts";
declare function treatWounds(options: ActionDefaultOptions): Promise<void>;
declare function treatWoundsMacroCallback({ actor, bonus, message, originalMessageId, outcome, }: {
    actor: ActorPF2e;
    bonus: number;
    message: ChatMessagePF2e;
    originalMessageId?: string;
    outcome?: DegreeOfSuccessString | null;
}): Promise<void>;
export { treatWounds, treatWoundsMacroCallback };
