import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical";
import { SheetOptions } from "@module/sheet/helpers";
import { EquipmentPF2e } from ".";
export declare class EquipmentSheetPF2e extends PhysicalItemSheetPF2e<EquipmentPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<EquipmentSheetData>;
}
interface EquipmentSheetData extends PhysicalItemSheetData<EquipmentPF2e> {
    bulkTypes: ConfigPF2e["PF2E"]["bulkTypes"];
    otherTags: SheetOptions;
}
export {};
