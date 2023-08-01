/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ChatMessagePF2e } from "@module/chat-message/index.ts";
declare class UserVisibilityPF2e {
    /** Edits HTML live based on permission settings. Used to hide certain blocks and values */
    static process($html: HTMLElement | JQuery, options?: ProcessOptions): void;
    static processMessageSender(message: ChatMessagePF2e, html: HTMLElement): void;
}
type UserVisibility = "all" | "owner" | "gm" | "none";
interface ProcessOptions {
    document?: ClientDocument | null;
    message?: ChatMessagePF2e;
}
export { UserVisibility, UserVisibilityPF2e };
