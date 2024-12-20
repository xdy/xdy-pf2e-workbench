import { ChatMessagePF2e } from "@module/chat-message/index.ts";

declare class UserVisibilityPF2e {
    /** Edits HTML live based on permission settings. Used to hide certain blocks and values */
    static process(html: HTMLElement, options?: ProcessOptions): void;
    static processMessageSender(message: ChatMessagePF2e, html: HTMLElement): void;
}
declare const USER_VISIBILITIES: Set<"none" | "all" | "gm" | "owner">;
type UserVisibility = SetElement<typeof USER_VISIBILITIES>;
interface ProcessOptions {
    document?: ClientDocument | null;
    message?: ChatMessagePF2e | null;
}
export { USER_VISIBILITIES, UserVisibilityPF2e, type UserVisibility };
