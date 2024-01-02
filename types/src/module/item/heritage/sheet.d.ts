/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { AncestryPF2e, type HeritagePF2e } from "@item";
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.ts";
export declare class HeritageSheetPF2e extends ItemSheetPF2e<HeritagePF2e> {
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<HeritageSheetData>;
    activateListeners($html: JQuery): void;
    _onDrop(event: DragEvent): Promise<void>;
}
interface HeritageSheetData extends ItemSheetDataPF2e<HeritagePF2e> {
    ancestry: AncestryPF2e | null;
    ancestryRefBroken: boolean;
}
export {};
