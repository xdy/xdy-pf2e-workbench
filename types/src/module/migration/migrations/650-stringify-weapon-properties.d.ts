import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Ensure weapon categories and ranges have valid properties */
export declare class Migration650StringifyWeaponProperties extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
