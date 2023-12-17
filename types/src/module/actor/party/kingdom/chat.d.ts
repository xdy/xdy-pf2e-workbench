import type { ChatMessagePF2e } from "@module/chat-message/document.ts";
/** Handler for kingdom chat messages. Does nothing if there is no kingdom */
export declare function handleKingdomChatMessageEvents(options: KingdomChatMessageParams): Promise<void>;
interface KingdomChatMessageParams {
    event: MouseEvent;
    message: ChatMessagePF2e;
    messageEl: HTMLElement;
}
export {};
