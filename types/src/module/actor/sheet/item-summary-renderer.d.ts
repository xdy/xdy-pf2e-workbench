/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e, CreaturePF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ItemSummaryData } from "@item/data";
/**
 * Implementation used to populate item summaries, toggle visibility
 * of item summaries, and save expanded/collapsed state of item summaries.
 */
export declare class ItemSummaryRenderer<TActor extends ActorPF2e> {
    protected sheet: Application & {
        get actor(): TActor;
    };
    constructor(sheet: Application & {
        get actor(): TActor;
    });
    activateListeners($html: JQuery): void;
    /**
     * Triggers toggling the visibility of an item summary element,
     * delegating the populating of the item summary to renderItemSummary().
     * Returns true if it the item is valid and it was toggled.
     */
    toggleSummary($element: JQuery, options?: {
        instant?: boolean;
    }): Promise<void>;
    /**
     * Called when an item summary is expanded and needs to be filled out.
     * @todo Move this to templates
     */
    renderItemSummary($div: JQuery, item: ItemPF2e, chatData: ItemSummaryData): Promise<void>;
    /**
     * Executes a callback, performing a save and restore for all item summaries to maintain visual state.
     * Most restorations are driven by a data-item-id attribute, however data-item-summary-id with a custom string
     * can be used to avoid conflicts in areas such as spell preparation.
     */
    saveAndRestoreState(callback: () => Promise<JQuery<HTMLElement>>): Promise<JQuery<HTMLElement>>;
}
export declare class CreatureSheetItemRenderer<AType extends CreaturePF2e> extends ItemSummaryRenderer<AType> {
    renderItemSummary($div: JQuery, item: Embedded<ItemPF2e>, chatData: Record<string, unknown>): Promise<void>;
}
