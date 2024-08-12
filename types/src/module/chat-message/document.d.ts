/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import { StrikeData } from "@actor/data/base.ts";
import { ItemPF2e } from "@item";
import type { UserPF2e } from "@module/user/index.ts";
import type { ScenePF2e, TokenDocumentPF2e } from "@scene/index.ts";
import { ChatMessageFlagsPF2e, ChatMessageSourcePF2e } from "./data.ts";
declare class ChatMessagePF2e extends ChatMessage {
    #private;
    /** Set some flags/flag scopes early. */
    protected _initializeSource(data: object, options?: DataModelConstructionOptions<null>): this["_source"];
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
    showDetails(): Promise<void>;
    /** Get the token of the speaker if possible */
    get token(): TokenDocumentPF2e<ScenePF2e> | null;
    getRollData(): Record<string, unknown>;
    getHTML(): Promise<JQuery>;
    protected _onCreate(data: this["_source"], operation: MessageCreateOperationPF2e, userId: string): void;
}
interface ChatMessagePF2e extends ChatMessage {
    author: UserPF2e | null;
    flags: ChatMessageFlagsPF2e;
    readonly _source: ChatMessageSourcePF2e;
}
declare namespace ChatMessagePF2e {
    function createDocuments<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data?: (TDocument | PreCreate<TDocument["_source"]>)[], operation?: Partial<MessageCreateOperationPF2e>): Promise<TDocument[]>;
    function getSpeakerActor(speaker: foundry.documents.ChatSpeakerData): ActorPF2e | null;
}
interface MessageCreateOperationPF2e extends ChatMessageCreateOperation {
    /** Whether this is a Rest for the Night message */
    restForTheNight?: boolean;
}
export { ChatMessagePF2e };
