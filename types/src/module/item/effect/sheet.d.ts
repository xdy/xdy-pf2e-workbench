/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.ts";
import type { EffectPF2e } from "./document.ts";
export declare class EffectSheetPF2e extends ItemSheetPF2e<EffectPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    protected get validTraits(): Record<string, string>;
    getData(options?: Partial<ItemSheetOptions>): Promise<EffectSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface EffectSheetData extends ItemSheetDataPF2e<EffectPF2e> {
    badgeType: string;
    expiryOptions: FormSelectOption[];
    reevaluateOptions: FormSelectOption[];
    timeUnits: ConfigPF2e["PF2E"]["timeUnits"];
}
export {};
