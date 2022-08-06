/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { FeatPF2e } from "@item/feat";
import { FeatSheetData } from "../sheet/data-types";
import { ItemSheetPF2e } from "../sheet/base";
export declare class FeatSheetPF2e extends ItemSheetPF2e<FeatPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<FeatSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
