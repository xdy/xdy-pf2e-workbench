import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical";
import { TreasurePF2e } from ".";
export declare class TreasureSheetPF2e extends PhysicalItemSheetPF2e<TreasurePF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<TreasureSheetData>;
}
interface TreasureSheetData extends PhysicalItemSheetData<TreasurePF2e> {
    currencies: ConfigPF2e["PF2E"]["currencies"];
}
export {};
