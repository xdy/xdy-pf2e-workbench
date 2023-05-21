import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
/** Set the `baseItem` property of base armor and weapons for the benefit of better unidentified names */
export declare class Migration629SetBaseItems extends MigrationBase {
    #private;
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
