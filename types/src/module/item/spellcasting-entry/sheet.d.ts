/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ItemSummaryRendererPF2e } from "@actor/sheet/item-summary-renderer";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { SpellcastingEntryPF2e } from ".";
declare class SpellPreparationSheet extends ActorSheet<ActorPF2e, ItemPF2e> {
    item: Embedded<SpellcastingEntryPF2e>;
    /** Implementation used to handle the toggling and rendering of item summaries */
    itemRenderer: ItemSummaryRendererPF2e<ActorPF2e>;
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
    getData(): {
        owner: boolean;
        entry: import("./data").SpellcastingEntryListData;
        actor: any;
        data: any;
        items: any;
        cssClass: "editable" | "locked";
        effects: RawObject<foundry.data.ActiveEffectData<foundry.documents.BaseActiveEffect>>[];
        limited: boolean;
        options: ActorSheetOptions;
        editable: boolean;
        document: ActorPF2e;
        title: string;
    } | {
        owner: boolean;
        entry: import("./data").SpellcastingEntryListData;
        then<TResult1 = ActorSheetData<ActorPF2e>, TResult2 = never>(onfulfilled?: ((value: ActorSheetData<ActorPF2e>) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<ActorSheetData<ActorPF2e> | TResult>;
        finally(onfinally?: (() => void) | null | undefined): Promise<ActorSheetData<ActorPF2e>>;
        [Symbol.toStringTag]: string;
    };
    activateListeners($html: JQuery<HTMLElement>): void;
    private getItemFromEvent;
    /** Allow adding new spells to the shortlist by dragging directly into the window */
    protected _onDropItemCreate(itemSource: ItemSourcePF2e | ItemSourcePF2e[]): Promise<ItemPF2e[]>;
    /** Override of inner render function to maintain item summary state */
    protected _renderInner(data: Record<string, unknown>, options: RenderOptions): Promise<JQuery<HTMLElement>>;
}
export { SpellPreparationSheet };
