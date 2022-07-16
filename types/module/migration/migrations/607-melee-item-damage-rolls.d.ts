import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Convert damageRolls arrays to objects. */
export declare class Migration607MeleeItemDamageRolls extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
