/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { StrikeData } from "@actor/data/base.ts";
import { ItemPF2e } from "@item";
import { UserPF2e } from "@module/user/index.ts";
import { ScenePF2e, TokenDocumentPF2e } from "@scene/index.ts";
import { ChatMessageFlagsPF2e, ChatMessageSourcePF2e } from "./data.ts";
declare class ChatMessagePF2e extends ChatMessage {
    #private;
    /** The chat log doesn't wait for data preparation before rendering, so set some data in the constructor */
    constructor(data?: DeepPartial<ChatMessageSourcePF2e>, context?: DocumentConstructionContext<null>);
    /** Is this a damage (or a manually-inputed non-D20) roll? */
    get isDamageRoll(): boolean;
    /** Get the actor associated with this chat message */
    get actor(): ActorPF2e | null;
    /** If this is a check or damage roll, it will have target information */
    get target(): {
        actor: ActorPF2e;
        token: TokenDocumentPF2e<ScenePF2e>;
    } | null;
    /** If the message came from dynamic inline content in a journal entry, the entry's ID may be used to retrieve it */
    get journalEntry(): JournalEntry | null;
    /** Does this message include a check (1d20 + c) roll? */
    get isCheckRoll(): boolean;
    /** Does the message include a rerolled check? */
    get isReroll(): boolean;
    /** Does the message include a check that hasn't been rerolled? */
    get isRerollable(): boolean;
    /** Get the owned item associated with this chat message */
    get item(): ItemPF2e<ActorPF2e> | null;
    /** If this message was for a strike, return the strike. Strikes will change in a future release */
    get _strike(): StrikeData | null;
    /** Get stringified item source from the DOM-rendering of this chat message */
    getItemFromDOM(): ItemPF2e<ActorPF2e> | null;
    showDetails(): Promise<void>;
    /** Get the token of the speaker if possible */
    get token(): TokenDocumentPF2e<ScenePF2e> | null;
    getRollData(): Record<string, unknown>;
    getHTML(): Promise<JQuery>;
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<null>, userId: string): void;
}
interface ChatMessagePF2e extends ChatMessage {
    readonly _source: ChatMessageSourcePF2e;
    flags: ChatMessageFlagsPF2e;
    get user(): UserPF2e;
}
declare namespace ChatMessagePF2e {
    function getSpeakerActor(speaker: foundry.documents.ChatSpeakerData): ActorPF2e | null;
}
export { ChatMessagePF2e };
