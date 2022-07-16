import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Increase level of 0th-level Cantrips to 1 */
export declare class Migration640CantripsAreNotZeroLevel extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
