/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { Coins } from "@item/treasure/helpers";
import { BasicConstructorOptions, TagSelectorType, TagSelectorOptions } from "@system/tag-selector";
import type { ActorPF2e } from "../base";
import { ActorSheetDataPF2e, CoinageSummary } from "./data-types";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data";
import { FolderPF2e } from "@module/folder";
import { ItemSummaryRendererPF2e } from "./item-summary-renderer";
/**
 * Extend the basic ActorSheet class to do all the PF2e things!
 * This sheet is an Abstract layer which is not used.
 * @category Actor
 */
export declare abstract class ActorSheetPF2e<TActor extends ActorPF2e> extends ActorSheet<TActor, ItemPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    /** Implementation used to handle the toggling and rendering of item summaries */
    itemRenderer: ItemSummaryRendererPF2e<TActor>;
    /** Can non-owning users loot items from this sheet? */
    get isLootSheet(): boolean;
    getData(options?: ActorSheetOptions): Promise<ActorSheetDataPF2e<TActor>>;
    protected abstract prepareItems(sheetData: ActorSheetDataPF2e<TActor>): void;
    protected findActiveList(): JQuery<HTMLElement>;
    protected static coinsToSheetData(coins: Coins): CoinageSummary;
    /** Save any open tinyMCE editor before closing */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    activateListeners($html: JQuery): void;
    onClickDeleteItem(event: JQuery.TriggeredEvent): Promise<void>;
    private onClickBrowseEquipmentCompendia;
    protected _canDragStart(selector: string): boolean;
    protected _canDragDrop(selector: string): boolean;
    /** Add support for dropping actions and toggles */
    protected _onDragStart(event: ElementDragEvent): void;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: ElementDragEvent, itemSource: ItemSourcePF2e): Promise<ItemPF2e[]>;
    protected _onDropItemCreate(itemSource: ItemSourcePF2e | ItemSourcePF2e[]): Promise<ItemPF2e[]>;
    onDropItem(data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    /** Extend the base _onDropItem method to handle dragging spells onto spell slots. */
    protected _onDropItem(event: ElementDragEvent, data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    protected _onDropFolder(_event: ElementDragEvent, data: DropCanvasData<"Folder", FolderPF2e>): Promise<ItemPF2e[]>;
    /**
     * Moves an item between two actors' inventories.
     * @param event         Event that fired this method.
     * @param sourceActorId ID of the actor who originally owns the item.
     * @param targetActorId ID of the actor where the item will be stored.
     * @param itemId           ID of the item to move between the two actors.
     */
    moveItemBetweenActors(event: ElementDragEvent, sourceActorId: string, sourceTokenId: string, targetActorId: string, targetTokenId: string, itemId: string): Promise<void>;
    /** Post the item's summary as a chat message */
    private onClickItemToChat;
    /** Opens an item container */
    private toggleContainer;
    /** Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset */
    private onClickCreateItem;
    /** Handle creating a new spellcasting entry for the actor */
    private createSpellcastingEntry;
    private editSpellcastingEntry;
    /**
     * Handle removing an existing spellcasting entry for the actor
     */
    private removeSpellcastingEntry;
    private onAddCoinsPopup;
    private onRemoveCoinsPopup;
    private onSellAllTreasure;
    protected onTraitSelector(event: JQuery.ClickEvent): void;
    /** Construct and render a tag selection menu */
    protected tagSelector(selectorType: Exclude<TagSelectorType, "basic">, options?: Partial<TagSelectorOptions>): void;
    protected tagSelector(selectorType: "basic", options: BasicConstructorOptions): void;
    /** Hide the sheet-config button unless there is more than one sheet option. */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    /** Override of inner render function to maintain item summary state */
    protected _renderInner(data: Record<string, unknown>, options: RenderOptions): Promise<JQuery<HTMLElement>>;
    protected _getSubmitData(updateData?: DocumentUpdateData<TActor>): Record<string, unknown>;
}
