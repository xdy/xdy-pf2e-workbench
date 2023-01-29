import { ConsumablePF2e } from "@item";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical";
import { SheetOptions } from "@module/sheet/helpers";
export declare class ConsumableSheetPF2e extends PhysicalItemSheetPF2e<ConsumablePF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<ConsumableSheetData>;
}
interface ConsumableSheetData extends PhysicalItemSheetData<ConsumablePF2e> {
    consumableTypes: ConfigPF2e["PF2E"]["consumableTypes"];
    otherTags: SheetOptions;
}
export {};
