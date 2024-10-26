/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorSheetPF2e, SheetClickActionHandlers } from "@actor/sheet/base.ts";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.ts";
import { ItemSummaryRenderer } from "@actor/sheet/item-summary-renderer.ts";
import { CampaignFeaturePF2e, ItemPF2e } from "@item";
import type { ItemSourcePF2e } from "@item/base/data/index.ts";
import type { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data.ts";
import { AdjustedValue } from "@module/sheet/helpers.ts";
import type { ArmyPF2e } from "./document.ts";

declare class ArmySheetPF2e extends ActorSheetPF2e<ArmyPF2e> {
    #private;
    /** Basic war actions are sheet data. Note that they cannot ever work with rule elements */
    basicWarActions: CampaignFeaturePF2e[];
    itemRenderer: ArmyItemRenderer;
    static get defaultOptions(): ActorSheetOptions;
    getData(options?: Partial<ActorSheetOptions>): Promise<ArmySheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    protected _onDropItem(event: DragEvent, data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: DragEvent, itemSource: ItemSourcePF2e): Promise<ItemPF2e[]>;
}
declare class ArmyItemRenderer extends ItemSummaryRenderer<ArmyPF2e, ArmySheetPF2e> {
    protected getItemFromElement(element: HTMLElement): Promise<ClientDocument | null>;
}
interface ArmySheetData extends ActorSheetDataPF2e<ArmyPF2e> {
    ac: {
        value: number;
        breakdown: string;
        adjustmentClass: string | null;
    };
    consumption: AdjustedValue;
    hitPoints: {
        value: number;
        max: AdjustedValue;
        routThreshold: AdjustedValue;
    };
    linked: boolean;
    armyTypes: Record<string, string>;
    rarityTraits: Record<string, string>;
    saves: ArmySaveSheetData[];
    basicWarActions: CampaignFeaturePF2e[];
    warActions: CampaignFeaturePF2e[];
}
interface ArmySaveSheetData {
    slug: string;
    label: string;
    mod: number;
    breakdown: string;
    adjustmentClass: string | null;
}
export { ArmySheetPF2e };
