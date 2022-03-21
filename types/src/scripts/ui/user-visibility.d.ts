/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";

declare const UserVisibilityPF2e: {
    /** Edits HTML live based on permission settings. Used to hide certain blocks and values */
    process: ($html: JQuery, { message, actor }?: {
        message?: ChatMessagePF2e | undefined;
        actor?: ActorPF2e | null | undefined;
    }) => void;
};
declare type UserVisibility = "all" | "owner" | "gm" | "none";
export { UserVisibilityPF2e, UserVisibility };
