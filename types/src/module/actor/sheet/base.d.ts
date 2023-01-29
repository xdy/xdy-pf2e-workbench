/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import { StrikeData } from "@actor/data/base";
import { Coins, ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data";
import { BasicConstructorOptions, TagSelectorOptions, TagSelectorType } from "@system/tag-selector";
import { ActorSheetDataPF2e, CoinageSummary, SheetInventory } from "./data-types";
import { ItemSummaryRenderer } from "./item-summary-renderer";
/**
 * Extend the basic ActorSheet class to do all the PF2e things!
 * This sheet is an Abstract layer which is not used.
 * @category Actor
 */
declare abstract class ActorSheetPF2e<TActor extends ActorPF2e> extends ActorSheet<TActor, ItemPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    /** Implementation used to handle the toggling and rendering of item summaries */
    itemRenderer: ItemSummaryRenderer<TActor>;
    /** Can non-owning users loot items from this sheet? */
    get isLootSheet(): boolean;
    getData(options?: ActorSheetOptions): Promise<ActorSheetDataPF2e<TActor>>;
    protected prepareInventory(): SheetInventory;
    protected static coinsToSheetData(coins: Coins): CoinageSummary;
    protected getStrikeFromDOM(target: HTMLElement): StrikeData | null;
    activateListeners($html: JQuery): void;
    onClickDeleteItem(event: JQuery.TriggeredEvent): Promise<void>;
    private onClickBrowseEquipmentCompendia;
    protected _canDragStart(selector: string): boolean;
    protected _canDragDrop(selector: string): boolean;
    /** Add support for dropping actions and toggles */
    protected _onDragStart(event: ElementDragEvent): void;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: ElementDragEvent, itemSource: ItemSourcePF2e): Promise<ItemPF2e[]>;
    /** Emulate a sheet item drop from the canvas */
    emulateItemDrop(data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    protected _onDropItem(event: ElementDragEvent, data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    /**
     * PF2e specific method called by _onDropItem() when this is a new item that needs to be dropped into the actor
     * that isn't already on the actor or transferring to another actor.
     */
    protected _handleDroppedItem(event: ElementDragEvent, item: ItemPF2e, data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    protected _onDropFolder(_event: ElementDragEvent, data: DropCanvasData<"Folder", Folder>): Promise<ItemPF2e[]>;
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
    /** Attempt to repair the item */
    private repairItem;
    /** Opens an item container */
    private toggleContainer;
    /** Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset */
    private onClickCreateItem;
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
    /** Overriden _render to maintain focus on tagify elements */
    protected _render(force?: boolean, options?: RenderOptions): Promise<void>;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    protected _getSubmitData(updateData?: DocumentUpdateData<TActor>): Record<string, unknown>;
}
interface ActorSheetPF2e<TActor extends ActorPF2e> extends ActorSheet<TActor, ItemPF2e> {
    prepareItems?(sheetData: ActorSheetDataPF2e<TActor>): Promise<void>;
}
export { ActorSheetPF2e };
