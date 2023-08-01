import { ChatMessagePF2e } from "../index.ts";
declare class ChatCards {
    #private;
    static listen(message: ChatMessagePF2e, html: HTMLElement): void;
}
export { ChatCards };
