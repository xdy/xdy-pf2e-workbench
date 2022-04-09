/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e, CreaturePF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ItemSummaryData } from "@item/data";
/**
 * Implementation used to populate item summaries, toggle visibility
 * of item summaries, and save expanded/collapsed state of item summaries.
 */
export declare class ItemSummaryRendererPF2e<AType extends ActorPF2e> {
    protected sheet: ActorSheet<AType, ItemPF2e>;
    constructor(sheet: ActorSheet<AType, ItemPF2e>);
    activateListeners($html: JQuery): void;
    /**
     * Triggers toggling the visibility of an item summary element,
     * delegating the populating of the item summary to renderItemSummary()
     */
    toggleItemSummary($li: JQuery, options?: {
        instant?: boolean;
    }): Promise<void>;
    /**
     * Called when an item summary is expanded and needs to be filled out.
     * @todo Move this to templates
     */
    renderItemSummary($div: JQuery, item: Embedded<ItemPF2e>, chatData: ItemSummaryData): void;
    /**
     * Executes a callback, performing a save and restore for all item summaries to maintain visual state.
     * Most restorations are driven by a data-item-id attribute, however data-item-summary-id with a custom string
     * can be used to avoid conflicts in areas such as spell preparation.
     */
    saveAndRestoreState(callback: () => Promise<JQuery<HTMLElement>>): Promise<JQuery<HTMLElement>>;
}
export declare class CreatureSheetItemRenderer<AType extends CreaturePF2e> extends ItemSummaryRendererPF2e<AType> {
    renderItemSummary($div: JQuery, item: Embedded<ItemPF2e>, chatData: Record<string, unknown>): void;
}
