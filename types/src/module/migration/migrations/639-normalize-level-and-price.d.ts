import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Normalize stringy level and price values */
export declare class Migration639NormalizeLevelAndPrice extends MigrationBase {
    static version: number;
    private coinSlugs;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
