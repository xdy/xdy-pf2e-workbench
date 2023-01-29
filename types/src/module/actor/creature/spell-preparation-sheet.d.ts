/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ItemSummaryRenderer } from "@actor/sheet/item-summary-renderer";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { SpellcastingAbilityData } from "@item/spellcasting-entry/data";
import { SpellcastingEntryPF2e } from "../../item/spellcasting-entry";
/**
 * Sheet used to render the the spell list for prepared casting.
 * It overrides the actor sheet to inherit important drag/drop behavior for actor items (the spells).
 */
declare class SpellPreparationSheet extends ActorSheet<ActorPF2e, ItemPF2e> {
    item: Embedded<SpellcastingEntryPF2e>;
    /** Implementation used to handle the toggling and rendering of item summaries */
    itemRenderer: ItemSummaryRenderer<ActorPF2e>;
    constructor(item: Embedded<SpellcastingEntryPF2e>, options: Partial<ActorSheetOptions>);
    static get defaultOptions(): ActorSheetOptions;
    /** Avoid conflicting with the real actor sheet */
    get id(): string;
    get title(): string;
    /**
     * This being an actor sheet saves us from most drag and drop re-implementation,
     * but we still have a gotcha in the form of the header buttons.
     * Reimplement to avoid sheet configuration and token options.
     */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    getData(): Promise<SpellPreparationSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    private getItemFromEvent;
    /** Allow adding new spells to the shortlist by dragging directly into the window */
    protected _onDropItemCreate(itemSource: ItemSourcePF2e | ItemSourcePF2e[]): Promise<ItemPF2e[]>;
    /** Allow transferring spells between open windows */
    protected _onSortItem(event: ElementDragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    /** Override of inner render function to maintain item summary state */
    protected _renderInner(data: Record<string, unknown>, options: RenderOptions): Promise<JQuery>;
}
interface SpellPreparationSheetData extends ActorSheetData<ActorPF2e> {
    actor: ActorPF2e;
    owner: boolean;
    entry: SpellcastingAbilityData;
}
export { SpellPreparationSheet };
