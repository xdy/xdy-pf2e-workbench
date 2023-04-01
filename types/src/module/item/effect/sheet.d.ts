/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { EffectPF2e } from ".";
import { ItemSheetPF2e } from "../sheet/base";
export declare class EffectSheetPF2e extends ItemSheetPF2e<EffectPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<EffectSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface EffectSheetData extends ItemSheetDataPF2e<EffectPF2e> {
    badgeType: string;
    timeUnits: ConfigPF2e["PF2E"]["timeUnits"];
}
export {};
