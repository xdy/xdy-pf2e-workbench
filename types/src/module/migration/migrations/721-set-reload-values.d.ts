import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
/** Set a reload of value of 0 to several weapons that had no reload */
export declare class Migration721SetReloadValues extends MigrationBase {
    static version: number;
    private toUpdate;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
