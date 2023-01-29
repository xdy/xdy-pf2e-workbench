import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert crafting-entry field discovery data to predicates */
export declare class Migration817FieldDiscoveryPredicates extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
