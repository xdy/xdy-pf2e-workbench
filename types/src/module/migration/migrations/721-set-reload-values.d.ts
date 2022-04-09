import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Set a reload of value of 0 to several weapons that had no reload */
export declare class Migration721SetReloadValues extends MigrationBase {
    static version: number;
    private toUpdate;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
