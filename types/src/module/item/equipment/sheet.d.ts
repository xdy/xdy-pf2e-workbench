import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/index.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import type { EquipmentPF2e } from "./document.ts";
export declare class EquipmentSheetPF2e extends PhysicalItemSheetPF2e<EquipmentPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<EquipmentSheetData>;
}
interface EquipmentSheetData extends PhysicalItemSheetData<EquipmentPF2e> {
    otherTags: SheetOptions;
}
export {};
