/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemSheetPF2e } from "../sheet/base";
import { PhysicalItemPF2e } from "@item/physical";
import { PhysicalItemSheetData } from "@item/sheet/data-types";
import { MaterialValuationData } from "./materials";
export declare class PhysicalItemSheetPF2e<TItem extends PhysicalItemPF2e = PhysicalItemPF2e> extends ItemSheetPF2e<TItem> {
    /** Show the identified data for editing purposes */
    getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<TItem>>;
    activateListeners($html: JQuery): void;
    protected prepareMaterials(valuationData: MaterialValuationData): {
        value: string;
        materials: Record<string, {
            label: string;
            grades: Partial<Record<"high" | "low" | "standard", import("./materials").MaterialGradeData>>;
        }>;
    };
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
