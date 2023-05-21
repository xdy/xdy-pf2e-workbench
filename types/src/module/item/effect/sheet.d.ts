/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e } from "@item/sheet/data-types.ts";
import { ItemSheetPF2e } from "../sheet/base.ts";
import { EffectPF2e } from "./document.ts";
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
