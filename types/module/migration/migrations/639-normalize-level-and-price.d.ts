import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Normalize stringy level and price values */
export declare class Migration639NormalizeLevelAndPrice extends MigrationBase {
    static version: number;
    private coinSlugs;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
