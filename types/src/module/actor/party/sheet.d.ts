/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "@actor/sheet/base.ts";
import { PartySheetData } from "./types.ts";
import { PartyPF2e } from "./document.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
interface PartySheetRenderOptions extends RenderOptions {
    actors?: boolean;
}
declare class PartySheetPF2e extends ActorSheetPF2e<PartyPF2e> {
    #private;
    regionTemplates: Record<string, string>;
    static get defaultOptions(): ActorSheetOptions;
    getData(options?: ActorSheetOptions): Promise<PartySheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Overriden to prevent inclusion of campaign-only item types. Those should get added to their own sheet */
    protected _onDropItemCreate(itemData: ItemSourcePF2e | ItemSourcePF2e[]): Promise<Item<PartyPF2e>[]>;
    /** Recursively performs a render and activation of all sub-regions */
    renderRegions(element: JQuery<HTMLElement>, data: object): Promise<void>;
    render(force?: boolean, options?: PartySheetRenderOptions): Promise<this>;
    protected _renderInner(data: Record<string, unknown>, options: RenderOptions): Promise<JQuery<HTMLElement>>;
    protected _onDropActor(event: ElementDragEvent, data: DropCanvasData<"Actor", PartyPF2e>): Promise<false | void>;
}
export { PartySheetPF2e, PartySheetRenderOptions };
