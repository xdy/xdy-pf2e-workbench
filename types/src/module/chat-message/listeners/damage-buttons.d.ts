/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ChatMessagePF2e } from "@module/chat-message";
/** Add apply damage buttons after a chat message is rendered */
export declare const DamageButtons: {
    append: (message: ChatMessagePF2e, html: JQuery) => Promise<void>;
};
