import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/index.ts";
import type { TreasurePF2e } from "./document.ts";
export declare class TreasureSheetPF2e extends PhysicalItemSheetPF2e<TreasurePF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<TreasureSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface TreasureSheetData extends PhysicalItemSheetData<TreasurePF2e> {
    currencies: ConfigPF2e["PF2E"]["currencies"];
    stackGroups: Pick<typeof CONFIG.PF2E.stackGroups, "coins" | "gems">;
}
export {};
