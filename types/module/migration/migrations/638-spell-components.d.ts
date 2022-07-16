import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert spell components from a string value to VSM */
export declare class Migration638SpellComponents extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
