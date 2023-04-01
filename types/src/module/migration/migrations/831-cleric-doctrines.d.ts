import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/**
 * Update rule elements on the Cleric doctrines to include references to the granted doctrines.
 */
export declare class Migration831ClericDoctrines extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
