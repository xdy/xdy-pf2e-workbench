/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { CreaturePF2e } from "@actor";
import { ItemSummaryRenderer } from "@actor/sheet/item-summary-renderer.ts";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { SpellcastingEntryPF2e, SpellcastingSheetData } from "@item/spellcasting-entry/index.ts";
/**
 * Sheet used to render the the spell list for prepared casting.
 * It overrides the actor sheet to inherit important drag/drop behavior for actor items (the spells).
 */
declare class SpellPreparationSheet<TActor extends CreaturePF2e> extends ActorSheet<TActor> {
    item: SpellcastingEntryPF2e<TActor>;
    /** Implementation used to handle the toggling and rendering of item summaries */
    itemRenderer: ItemSummaryRenderer<TActor>;
    constructor(item: SpellcastingEntryPF2e<TActor>, options: Partial<ActorSheetOptions>);
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
    getData(): Promise<SpellPreparationSheetData<TActor>>;
    activateListeners($html: JQuery<HTMLElement>): void;
    private getItemFromEvent;
    /** Allow adding new spells to the shortlist by dragging directly into the window */
    protected _onDropItemCreate(itemSource: ItemSourcePF2e | ItemSourcePF2e[]): Promise<ItemPF2e<TActor>[]>;
    /** Allow transferring spells between open windows */
    protected _onSortItem(event: ElementDragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e<TActor>[]>;
    /** Override of inner render function to maintain item summary state */
    protected _renderInner(data: Record<string, unknown>, options: RenderOptions): Promise<JQuery>;
}
interface SpellPreparationSheetData<TActor extends CreaturePF2e> extends ActorSheetData<TActor> {
    owner: boolean;
    entry: SpellcastingSheetData;
}
export { SpellPreparationSheet };
