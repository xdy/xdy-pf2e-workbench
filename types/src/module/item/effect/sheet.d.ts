/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { EffectPF2e } from ".";
import { ItemSheetPF2e } from "../sheet/base";
export declare class EffectSheetPF2e extends ItemSheetPF2e<EffectPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<ItemSheetDataPF2e<EffectPF2e>>;
    activateListeners($html: JQuery<HTMLElement>): void;
}
