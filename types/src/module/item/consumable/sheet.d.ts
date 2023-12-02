import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/index.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import type { ConsumablePF2e } from "./document.ts";
export declare class ConsumableSheetPF2e extends PhysicalItemSheetPF2e<ConsumablePF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ConsumableSheetData>;
}
interface ConsumableSheetData extends PhysicalItemSheetData<ConsumablePF2e> {
    consumableTypes: ConfigPF2e["PF2E"]["consumableTypes"];
    materialEffects: SheetOptions;
    stackGroups: Omit<typeof CONFIG.PF2E.stackGroups, "coins" | "gems" | "sacks"> | null;
    otherTags: SheetOptions;
}
export {};
