import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Damage can now be split into multiple rows for spells */
export declare class Migration659MultipleDamageRows extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
