/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { HeritagePF2e } from "@item";
import { ItemSheetPF2e } from "@item/sheet/base";
import { HeritageSheetData } from "@item/sheet/data-types";
export declare class HeritageSheetPF2e extends ItemSheetPF2e<HeritagePF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<HeritageSheetData>;
    activateListeners($html: JQuery): void;
    _onDrop(event: ElementDragEvent): Promise<void>;
}
