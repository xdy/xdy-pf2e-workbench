import { ChatMessagePF2e } from "@module/chat-message";
export declare class ChatLogPF2e extends ChatLog<ChatMessagePF2e> {
    /** Replace parent method in order to use DamageRoll class as needed */
    protected _processDiceCommand(command: string, matches: RegExpMatchArray[], chatData: DeepPartial<foundry.data.ChatMessageSource>, createOptions: ChatMessageModificationContext): Promise<void>;
    protected _getEntryContextOptions(): EntryContextOption[];
}
