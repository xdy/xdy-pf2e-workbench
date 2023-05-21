/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { AncestryPF2e, HeritagePF2e } from "@item";
import { ItemSheetPF2e } from "@item/sheet/base.ts";
import { ItemSheetDataPF2e } from "@item/sheet/data-types.ts";
export declare class HeritageSheetPF2e extends ItemSheetPF2e<HeritagePF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<HeritageSheetData>;
    activateListeners($html: JQuery): void;
    _onDrop(event: ElementDragEvent): Promise<void>;
}
interface HeritageSheetData extends ItemSheetDataPF2e<HeritagePF2e> {
    ancestry: AncestryPF2e | null;
    ancestryRefBroken: boolean;
}
export {};
