import { ChatMessagePF2e } from "@module/chat-message";
/** Add apply damage buttons after a chat message is rendered */
declare class DamageButtons {
    #private;
    static listen(message: ChatMessagePF2e, html: HTMLElement): Promise<void>;
}
export { DamageButtons };
