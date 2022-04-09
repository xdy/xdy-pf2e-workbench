/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";
declare const UserVisibilityPF2e: {
    /** Edits HTML live based on permission settings. Used to hide certain blocks and values */
    process: ($html: JQuery, { message, actor }?: ProcessOptions) => void;
};
declare type UserVisibility = "all" | "owner" | "gm" | "none";
interface ProcessOptions {
    message?: ChatMessagePF2e;
    actor?: ActorPF2e | null;
}
export { UserVisibilityPF2e, UserVisibility };
