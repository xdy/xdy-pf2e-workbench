/// <reference types="jquery" />
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";
import { UserPF2e } from "@module/user";
import { EnrichHTMLOptionsPF2e } from "@system/text-editor";
import { RuleElementOptions, RuleElementPF2e } from "@module/rules";
import { ItemDataPF2e, ItemSourcePF2e, ItemSummaryData, ItemType, TraitChatData } from "./data";
import { PhysicalItemPF2e } from "./physical/document";
import { ItemSheetPF2e } from "./sheet/base";
interface ItemConstructionContextPF2e extends DocumentConstructionContext<ItemPF2e> {
    pf2e?: {
        ready?: boolean;
    };
}
/** Override and extend the basic :class:`Item` implementation */
declare class ItemPF2e extends Item<ActorPF2e> {
    /** Has this item gone through at least one cycle of data preparation? */
    private initialized?;
    /** Prepared rule elements from this item */
    rules: RuleElementPF2e[];
    constructor(data: PreCreate<ItemSourcePF2e>, context?: ItemConstructionContextPF2e);
    /** The sluggified name of the item **/
    get slug(): string | null;
    /** The compendium source ID of the item **/
    get sourceId(): ItemUUID | null;
    /** The recorded schema version of this item, updated after each data migration */
    get schemaVersion(): number | null;
    get description(): string;
    /** Check this item's type (or whether it's one among multiple types) without a call to `instanceof` */
    isOfType(type: "physical"): this is PhysicalItemPF2e;
    isOfType<T extends ItemType>(...types: T[]): this is InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][T]>;
    isOfType<T extends "physical" | ItemType>(...types: T[]): this is PhysicalItemPF2e | InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][Exclude<T, "physical">]>;
    /** Redirect the deletion of any owned items to ActorPF2e#deleteEmbeddedDocuments for a single workflow */
    delete(context?: DocumentModificationContext<this>): Promise<this>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    getRollData(): NonNullable<EnrichHTMLOptionsPF2e["rollData"]>;
    /**
     * Create a chat card for this item and either return the message or send it to the chat log. Many cards contain
     * follow-up options for attack rolls, effect application, etc.
     */
    toMessage(event?: JQuery.TriggeredEvent, { rollMode, create, data, }?: {
        rollMode?: RollMode;
        create?: boolean;
        data?: Record<string, unknown>;
    }): Promise<ChatMessagePF2e | undefined>;
    /** A shortcut to `item.toMessage(..., { create: true })`, kept for backward compatibility */
    toChat(event?: JQuery.TriggeredEvent): Promise<ChatMessagePF2e | undefined>;
    protected _initialize(): void;
    /** Refresh the Item Directory if this item isn't owned */
    prepareData(): void;
    /** Ensure the presence of the pf2e flag scope with default properties and values */
    prepareBaseData(): void;
    prepareRuleElements(options?: RuleElementOptions): RuleElementPF2e[];
    /** Pull the latest system data from the source compendium and replace this item's with it */
    refreshFromCompendium(): Promise<void>;
    /**
     * Internal method that transforms data into something that can be used for chat.
     * Currently renders description text using enrichHTML.
     */
    protected processChatData<T extends ItemSummaryData>(htmlOptions: EnrichHTMLOptionsPF2e | undefined, data: T): Promise<T>;
    getChatData(htmlOptions?: EnrichHTMLOptionsPF2e, _rollOptions?: Record<string, unknown>): Promise<ItemSummaryData>;
    protected traitChatData(dictionary?: Record<string, string | undefined>): TraitChatData[];
    /** Don't allow the user to create a condition or spellcasting entry from the sidebar. */
    static createDialog(data?: {
        folder?: string;
    }, options?: Partial<FormApplicationOptions>): Promise<ItemPF2e | undefined>;
    /** Assess and pre-process this JSON data, ensuring it's importable and fully migrated */
    importFromJSON(json: string): Promise<this>;
    static createDocuments<T extends foundry.abstract.Document>(this: ConstructorOf<T>, data?: PreCreate<T["_source"]>[], context?: DocumentModificationContext<T>): Promise<T[]>;
    static deleteDocuments<T extends ConstructorOf<ItemPF2e>>(this: T, ids?: string[], context?: DocumentModificationContext<InstanceType<T>>): Promise<InstanceType<T>[]>;
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    /** Keep `TextEditor` and anything else up to no good from setting this item's description to `null` */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    /** Call onCreate rule-element hooks */
    protected _onCreate(data: ItemSourcePF2e, options: DocumentModificationContext<this>, userId: string): void;
    /** Call onDelete rule-element hooks */
    protected _onDelete(options: DocumentModificationContext, userId: string): void;
}
interface ItemPF2e {
    readonly data: ItemDataPF2e;
    readonly parent: ActorPF2e | null;
    _sheet: ItemSheetPF2e<this> | null;
    get sheet(): ItemSheetPF2e<this>;
    prepareSiblingData?(this: Embedded<ItemPF2e>): void;
    prepareActorData?(this: Embedded<ItemPF2e>): void;
    /** Returns items that should also be added when this item is created */
    createGrantedItems(): Promise<ItemPF2e[]>;
    /** Returns items that should also be deleted should this item be deleted */
    getLinkedItems?(): Embedded<ItemPF2e>[];
}
export { ItemPF2e, ItemConstructionContextPF2e };
