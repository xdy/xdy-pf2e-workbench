import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Change all "weapon:*" predication statements to "item:*" ones  */
export declare class Migration798WeaponToItemStatements extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
