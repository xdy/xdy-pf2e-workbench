/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { RollDataPF2e } from "@system/rolls";
import { ItemPF2e } from "@item";
import { ChatMessageDataPF2e, ChatMessageSourcePF2e } from "./data";
import { TokenDocumentPF2e } from "@scene";
import { UserPF2e } from "@module/user";
declare class ChatMessagePF2e extends ChatMessage<ActorPF2e> {
    /** The chat log doesn't wait for data preparation before rendering, so set some data in the constructor */
    constructor(data?: DeepPartial<ChatMessageSourcePF2e>, context?: DocumentConstructionContext<ChatMessagePF2e>);
    /** Is this a damage (or a manually-inputed non-D20) roll? */
    get isDamageRoll(): boolean;
    /** Get the actor associated with this chat message */
    get actor(): ActorPF2e | null;
    /** If this is a check or damage roll, it will have target information */
    get target(): {
        actor: ActorPF2e;
        token: Embedded<TokenDocumentPF2e>;
    } | null;
    /** Does this message include a check (1d20 + c) roll? */
    get isCheckRoll(): boolean;
    /** Does the message include a rerolled check? */
    get isReroll(): boolean;
    /** Does the message include a check that hasn't been rerolled? */
    get isRerollable(): boolean;
    /** Get the owned item associated with this chat message */
    get item(): Embedded<ItemPF2e> | null;
    /** Get stringified item source from the DOM-rendering of this chat message */
    getItemFromDOM(): Embedded<ItemPF2e> | null;
    /** Get the token of the speaker if possible */
    get token(): Embedded<TokenDocumentPF2e> | null;
    /** As of Foundry 9.251, players are able to delete their own messages, and GMs are unable to restrict it. */
    protected static _canDelete(user: UserPF2e): boolean;
    getHTML(): Promise<JQuery>;
    private onHoverIn;
    private onHoverOut;
    private onClick;
    protected _onCreate(data: foundry.data.ChatMessageSource, options: DocumentModificationContext, userId: string): void;
}
interface ChatMessagePF2e extends ChatMessage<ActorPF2e> {
    readonly data: ChatMessageDataPF2e<this>;
    get roll(): Rolled<Roll<RollDataPF2e>>;
}
declare namespace ChatMessagePF2e {
    function getSpeakerActor(speaker: foundry.data.ChatSpeakerSource | foundry.data.ChatSpeakerData): ActorPF2e | null;
}
export { ChatMessagePF2e };
