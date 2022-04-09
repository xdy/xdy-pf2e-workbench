import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Set the `baseItem` property of base armor and weapons for the benefit of better unidentified names */
export declare class Migration629SetBaseItems extends MigrationBase {
    static version: number;
    private BASE_ARMORS;
    private MAGIC_ARMOR_TO_BASE;
    private BASE_WEAPONS;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
