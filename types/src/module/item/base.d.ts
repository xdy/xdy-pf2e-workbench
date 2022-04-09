/// <reference types="jquery" />
import { ChatMessagePF2e } from "@module/chat-message";
import { ActorPF2e } from "@actor";
import { RuleElementPF2e, RuleElementOptions } from "../rules";
import { ItemSummaryData, ItemDataPF2e, ItemSourcePF2e, TraitChatData, ItemType } from "./data";
import { ItemSheetPF2e } from "./sheet/base";
import { UserPF2e } from "@module/user";
import { GhostTemplate } from "@module/ghost-measured-template";
import { EnrichHTMLOptionsPF2e } from "@system/text-editor";
export interface ItemConstructionContextPF2e extends DocumentConstructionContext<ItemPF2e> {
    pf2e?: {
        ready?: boolean;
    };
}
/** Override and extend the basic :class:`Item` implementation */
declare class ItemPF2e extends Item<ActorPF2e> {
    /** Has this item gone through at least one cycle of data preparation? */
    private initialized;
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
    isOfType<T extends ItemType>(...types: T[]): this is InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][T]>;
    /** Redirect the deletion of any owned items to ActorPF2e#deleteEmbeddedDocuments for a single workflow */
    delete(context?: DocumentModificationContext): Promise<this>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    getRollData(): NonNullable<EnrichHTMLOptionsPF2e["rollData"]>;
    /**
     * Create a chat card for this item and either return the message or send it to the chat log. Many cards contain
     * follow-up options for attack rolls, effect application, etc.
     */
    toMessage(event?: JQuery.TriggeredEvent, { create, data }?: {
        create?: boolean | undefined;
        data?: {} | undefined;
    }): Promise<ChatMessagePF2e | undefined>;
    /** A shortcut to `item.toMessage(..., { create: true })`, kept for backward compatibility */
    toChat(event?: JQuery.TriggeredEvent): Promise<ChatMessagePF2e | undefined>;
    /** Refresh the Item Directory if this item isn't owned */
    prepareData(): void;
    /** Ensure the presence of the pf2e flag scope with default properties and values */
    prepareBaseData(): void;
    prepareRuleElements(this: Embedded<ItemPF2e>, options?: RuleElementOptions): RuleElementPF2e[];
    /** Pull the latest system data from the source compendium and replace this item's with it */
    refreshFromCompendium(): Promise<void>;
    /**
     * Internal method that transforms data into something that can be used for chat.
     * Currently renders description text using enrichHTML.
     */
    protected processChatData<T extends {
        properties?: (string | number | null)[];
        [key: string]: unknown;
    }>(htmlOptions: EnrichHTMLOptionsPF2e | undefined, data: T): T;
    getChatData(htmlOptions?: EnrichHTMLOptionsPF2e, _rollOptions?: Record<string, unknown>): ItemSummaryData;
    protected traitChatData(dictionary?: Record<string, string>): TraitChatData[];
    /**
     * Roll a NPC Attack
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollNPCAttack(this: Embedded<ItemPF2e>, event: JQuery.ClickEvent, multiAttackPenalty?: number): void;
    /**
     * Roll NPC Damage
     * Rely upon the DicePF2e.damageRoll logic for the core implementation
     */
    rollNPCDamage(this: Embedded<ItemPF2e>, event: JQuery.ClickEvent, critical?: boolean): void;
    createTemplate(): GhostTemplate;
    placeTemplate(_event: JQuery.ClickEvent): void;
    calculateMap(): {
        label: string;
        map2: number;
        map3: number;
    };
    static calculateMap(item: ItemDataPF2e): {
        label: string;
        map2: number;
        map3: number;
    };
    /** Don't allow the user to create a condition or spellcasting entry from the sidebar. */
    static createDialog(data?: {
        folder?: string;
    }, options?: Partial<FormApplicationOptions>): Promise<ItemPF2e | undefined>;
    /** Assess and pre-process this JSON data, ensuring it's importable and fully migrated */
    importFromJSON(json: string): Promise<this>;
    static createDocuments<T extends ConstructorOf<ItemPF2e>>(this: T, data?: PreCreate<InstanceType<T>["data"]["_source"]>[], context?: DocumentModificationContext<InstanceType<T>>): Promise<InstanceType<T>[]>;
    static deleteDocuments<T extends ConstructorOf<ItemPF2e>>(this: T, ids?: string[], context?: DocumentModificationContext<InstanceType<T>>): Promise<InstanceType<T>[]>;
    protected _preCreate(data: PreDocumentId<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    /** Keep `TextEditor` and anything else up to no good from setting this item's description to `null` */
    protected _preUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    /** Call onCreate rule-element hooks */
    protected _onCreate(data: ItemSourcePF2e, options: DocumentModificationContext<this>, userId: string): void;
    /** Call onDelete rule-element hooks */
    protected _onDelete(options: DocumentModificationContext, userId: string): void;
}
interface ItemPF2e {
    readonly data: ItemDataPF2e;
    readonly parent: ActorPF2e | null;
    _sheet: ItemSheetPF2e<ItemPF2e> | null;
    get sheet(): ItemSheetPF2e<this>;
    prepareSiblingData?(this: Embedded<ItemPF2e>): void;
    prepareActorData?(this: Embedded<ItemPF2e>): void;
}
export { ItemPF2e };
