import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Change all "weapon:*" predication statements to "item:*" ones  */
export declare class Migration798WeaponToItemStatements extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
