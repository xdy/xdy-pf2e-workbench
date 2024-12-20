/// <reference types="jquery" resolution-mode="require"/>
import { ActorPF2e } from "@actor/base.ts";
import type { PhysicalItemPF2e } from "@item";
import { ItemOriginFlag } from "@module/chat-message/data.ts";
import { ChatMessagePF2e } from "@module/chat-message/document.ts";
import { RuleElementOptions, RuleElementPF2e } from "@module/rules/index.ts";
import type { UserPF2e } from "@module/user/document.ts";
import { EnrichmentOptionsPF2e } from "@system/text-editor.ts";
import { ItemInstances } from "../types.ts";
import type {
    ItemFlagsPF2e,
    ItemSourcePF2e,
    ItemSystemData,
    ItemType,
    RawItemChatData,
    TraitChatData,
} from "./data/index.ts";
import type { ItemTrait } from "./data/system.ts";
import type { ItemSheetPF2e } from "./sheet/sheet.ts";

/** The basic `Item` subclass for the system */
declare class ItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends Item<TParent> {
    /** Has this document completed `DataModel` initialization? */
    initialized: boolean;
    /** Additional item roll options set by rule elements */
    rollOptions: Set<string>;
    /** The item that granted this item, if any */
    grantedBy: ItemPF2e<ActorPF2e> | null;
    static getDefaultArtwork(itemData: foundry.documents.ItemSource): {
        img: ImageFilePath;
    };
    /** Traits an item of this type can have */
    static get validTraits(): Partial<Record<ItemTrait, string>>;
    /** Prepared rule elements from this item */
    rules: RuleElementPF2e[];
    /** The sluggified name of the item **/
    get slug(): string | null;
    /** The UUID of the item from which this one was copied (or is identical to if a compendium item) **/
    get sourceId(): ItemUUID | null;
    /** The recorded schema version of this item, updated after each data migration */
    get schemaVersion(): number | null;
    get description(): string;
    /** Check whether this item is in-memory-only on an actor rather than being a world item or embedded and stored */
    get inMemoryOnly(): boolean;
    /**
     * Set a source ID on a dropped embedded item without a full data reset
     * This is currently necessary as of 10.291 due to system measures to prevent premature data preparation
     */
    static fromDropData<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data: object, options?: Record<string, unknown>): Promise<TDocument | undefined>;
    /** Check this item's type (or whether it's one among multiple types) without a call to `instanceof` */
    isOfType<T extends ItemType>(...types: T[]): this is ItemInstances<TParent>[T];
    isOfType(type: "physical"): this is PhysicalItemPF2e<TParent>;
    isOfType<T extends "physical" | ItemType>(...types: T[]): this is T extends "physical" ? PhysicalItemPF2e<TParent> : T extends ItemType ? ItemInstances<TParent>[T] : never;
    /** Redirect the deletion of any owned items to ActorPF2e#deleteEmbeddedDocuments for a single workflow */
    delete(operation?: Partial<DatabaseDeleteOperation<TParent>>): Promise<this | undefined>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string, { includeGranter }?: {
        includeGranter?: boolean | undefined;
    }): string[];
    getRollData(): NonNullable<EnrichmentOptionsPF2e["rollData"]>;
    /**
     * Create a chat card for this item and either return the message or send it to the chat log. Many cards contain
     * follow-up options for attack rolls, effect application, etc.
     */
    toMessage(event?: Maybe<Event | JQuery.TriggeredEvent>, options?: {
        rollMode?: RollMode | "roll";
        create?: boolean;
        data?: Record<string, unknown>;
    }): Promise<ChatMessagePF2e | undefined>;
    /** A shortcut to `item.toMessage(..., { create: true })`, kept for backward compatibility */
    toChat(event?: JQuery.TriggeredEvent): Promise<ChatMessagePF2e | undefined>;
    protected _initialize(options?: Record<string, unknown>): void;
    /**
     * Never prepare data except as part of `DataModel` initialization. If embedded, don't prepare data if the parent is
     * not yet initialized. See https://github.com/foundryvtt/foundryvtt/issues/7987
     * @todo remove in V13
     */
    prepareData(): void;
    /** Ensure the presence of the pf2e flag scope with default properties and values */
    prepareBaseData(): void;
    prepareRuleElements(options?: Omit<RuleElementOptions, "parent">): RuleElementPF2e[];
    /** Pull the latest system data from the source compendium and replace this item's with it */
    refreshFromCompendium(options?: RefreshFromCompendiumParams): Promise<this | null>;
    getOriginData(): ItemOriginFlag;
    /**
     * Internal method that transforms data into something that can be used for chat.
     * Currently renders description text using enrichHTML.
     */
    protected processChatData(htmlOptions: EnrichmentOptionsPF2e | undefined, chatData: RawItemChatData): Promise<RawItemChatData>;
    getChatData(htmlOptions?: EnrichmentOptionsPF2e, _rollOptions?: Record<string, unknown>): Promise<RawItemChatData>;
    traitChatData(dictionary?: Record<string, string | undefined>, traits?: ItemTrait[]): TraitChatData[];
    /** Don't allow the user to create a condition or spellcasting entry from the sidebar. */
    static createDialog<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data?: Record<string, unknown>, context?: {
        parent?: TDocument["parent"];
        pack?: Collection<TDocument> | null;
        types?: ItemType[];
    } & Partial<FormApplicationOptions>): Promise<TDocument | null>;
    /** Assess and pre-process this JSON data, ensuring it's importable and fully migrated */
    importFromJSON(json: string): Promise<this>;
    /** Include the item type along with data from upstream */
    toDragData(): {
        type: string;
        itemType: string;
        [key: string]: unknown;
    };
    static createDocuments<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data?: (TDocument | PreCreate<TDocument["_source"]>)[], operation?: Partial<DatabaseCreateOperation<TDocument["parent"]>>): Promise<TDocument[]>;
    static deleteDocuments<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, ids?: string[], operation?: Partial<DatabaseCreateOperation<TDocument["parent"]>>): Promise<TDocument[]>;
    protected _preCreate(data: this["_source"], options: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Keep `TextEditor` and anything else up to no good from setting this item's description to `null` */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Call onCreate rule-element hooks */
    protected _onCreate(data: ItemSourcePF2e, operation: DatabaseCreateOperation<TParent>, userId: string): void;
    /** Refresh the Item Directory if this item isn't embedded */
    protected _onUpdate(data: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, userId: string): void;
    /** Call onDelete rule-element hooks */
    protected _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
    /** To be overridden by subclasses to extend the HTML string that will become part of the embed */
    protected embedHTMLString(_config: DocumentHTMLEmbedConfig, _options: EnrichmentOptions): string;
    _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options: EnrichmentOptions): Promise<HTMLCollection>;
}
interface ItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends Item<TParent> {
    constructor: typeof ItemPF2e;
    flags: ItemFlagsPF2e;
    readonly _source: ItemSourcePF2e;
    system: ItemSystemData;
    _sheet: ItemSheetPF2e<this> | null;
    get sheet(): ItemSheetPF2e<this>;
    prepareSiblingData?(this: ItemPF2e<ActorPF2e>): void;
    prepareActorData?(this: ItemPF2e<ActorPF2e>): void;
    /** Optional data-preparation callback executed after rule-element synthetics are prepared */
    onPrepareSynthetics?(this: ItemPF2e<ActorPF2e>): void;
    /** Returns items that should also be added when this item is created */
    createGrantedItems?(options?: object): Promise<ItemPF2e[]>;
    /** Returns items that should also be deleted should this item be deleted */
    getLinkedItems?(): ItemPF2e<ActorPF2e>[];
}
/** A `Proxy` to to get Foundry to construct `ItemPF2e` subclasses */
declare const ItemProxyPF2e: typeof ItemPF2e;
interface RefreshFromCompendiumParams {
    /** Whether to overwrite the name if it is different */
    name?: boolean;
    /** Whether to notify the user that the item has been refreshed */
    notify?: boolean;
    /** Whether to run the update: if false, a clone with updated source is returned. */
    update?: boolean;
}
export { ItemPF2e, ItemProxyPF2e };
