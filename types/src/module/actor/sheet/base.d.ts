/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import { StrikeData } from "@actor/data/base.ts";
import { ItemPF2e, PhysicalItemPF2e } from "@item";
import { Coins } from "@item/physical/data.ts";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data.ts";
import { BasicConstructorOptions, TagSelectorOptions, TagSelectorType } from "@system/tag-selector/index.ts";
import { ActorSheetDataPF2e, ActorSheetRenderOptionsPF2e, CoinageSummary, InventoryItem, SheetInventory } from "./data-types.ts";
import { ItemSummaryRenderer } from "./item-summary-renderer.ts";
/**
 * Extend the basic ActorSheet class to do all the PF2e things!
 * This sheet is an Abstract layer which is not used.
 * @category Actor
 */
declare abstract class ActorSheetPF2e<TActor extends ActorPF2e> extends ActorSheet<TActor, ItemPF2e> {
    #private;
    static get defaultOptions(): ActorSheetOptions;
    /** Implementation used to handle the toggling and rendering of item summaries */
    itemRenderer: ItemSummaryRenderer<TActor>;
    /** Can non-owning users loot items from this sheet? */
    get isLootSheet(): boolean;
    getData(options?: ActorSheetOptions): Promise<ActorSheetDataPF2e<TActor>>;
    protected prepareInventory(): SheetInventory;
    protected prepareInventoryItem(item: PhysicalItemPF2e): InventoryItem;
    protected static coinsToSheetData(coins: Coins): CoinageSummary;
    protected getStrikeFromDOM(button: HTMLElement): StrikeData | null;
    activateListeners($html: JQuery): void;
    /** DOM listeners for inventory panel */
    protected activateInventoryListeners(panel: HTMLElement | null): void;
    protected deleteItem(element: HTMLElement, item: ItemPF2e, event?: MouseEvent): Promise<void>;
    protected _canDragStart(selector: string): boolean;
    protected _canDragDrop(selector: string): boolean;
    /** Add support for dropping actions and toggles */
    protected _onDragStart(event: DragEvent): void;
    /** Emulate a sheet item drop from the canvas */
    emulateItemDrop(data: DropCanvasItemDataPF2e): Promise<ItemPF2e<ActorPF2e | null>[]>;
    protected _onDropItem(event: DragEvent, data: DropCanvasItemDataPF2e & {
        fromInventory?: boolean;
    }): Promise<ItemPF2e<ActorPF2e | null>[]>;
    /**
     * PF2e specific method called by _onDropItem() when this is a new item that needs to be dropped into the actor
     * that isn't already on the actor or transferring to another actor.
     */
    protected _handleDroppedItem(event: DragEvent, item: ItemPF2e<ActorPF2e | null>, data: DropCanvasItemDataPF2e): Promise<ItemPF2e<ActorPF2e | null>[]>;
    protected _onDropFolder(_event: DragEvent, data: DropCanvasData<"Folder", Folder>): Promise<ItemPF2e<TActor>[]>;
    /**
     * Moves an item between two actors' inventories.
     * @param event         Event that fired this method.
     * @param sourceActorId ID of the actor who originally owns the item.
     * @param targetActorId ID of the actor where the item will be stored.
     * @param itemId           ID of the item to move between the two actors.
     */
    moveItemBetweenActors(event: DragEvent, sourceActorId: string, sourceTokenId: string | null, targetActorId: string, targetTokenId: string | null, itemId: string): Promise<void>;
    protected openTagSelector(anchor: HTMLElement, options?: Partial<TagSelectorOptions>): void;
    /** Construct and render a tag selection menu */
    protected tagSelector(selectorType: Exclude<TagSelectorType, "basic">, options?: Partial<TagSelectorOptions>): void;
    protected tagSelector(selectorType: "basic", options: BasicConstructorOptions): void;
    /** Opens a sheet tab by name. May be overriden to handle sub-tabs */
    protected openTab(name: string): void;
    /** Override of inner render function to maintain item summary state */
    protected _renderInner(data: Record<string, unknown>, options: RenderOptions): Promise<JQuery>;
    /** Overriden _render to maintain focus on tagify elements */
    protected _render(force?: boolean, options?: ActorSheetRenderOptionsPF2e): Promise<void>;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    protected _getSubmitData(updateData?: DocumentUpdateData<TActor>): Record<string, unknown>;
}
interface ActorSheetPF2e<TActor extends ActorPF2e> extends ActorSheet<TActor, ItemPF2e> {
    prepareItems?(sheetData: ActorSheetDataPF2e<TActor>): Promise<void>;
    render(force?: boolean, options?: ActorSheetRenderOptionsPF2e): this | Promise<this>;
}
export { ActorSheetPF2e };
