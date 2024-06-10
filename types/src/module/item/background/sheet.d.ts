/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { ABCSheetData, ABCSheetPF2e } from "../abc/sheet.ts";
import type { BackgroundPF2e } from "./document.ts";
export declare class BackgroundSheetPF2e extends ABCSheetPF2e<BackgroundPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<BackgroundSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface BackgroundSheetData extends ABCSheetData<BackgroundPF2e> {
    trainedSkills: SheetOptions;
    selectedBoosts: Record<string, Record<string, string>>;
}
export {};
