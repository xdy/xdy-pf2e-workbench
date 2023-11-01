import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Increase level of 0th-level Cantrips to 1 */
export declare class Migration640CantripsAreNotZeroLevel extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
