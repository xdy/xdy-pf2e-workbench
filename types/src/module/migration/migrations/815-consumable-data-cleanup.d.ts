import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Clean up entries of consumable system data */
export declare class Migration815ConsumableDataCleanup extends MigrationBase {
    static version: number;
    consumableKeys: Set<string>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
