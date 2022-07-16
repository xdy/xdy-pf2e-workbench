import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Fix featType properties erroneously set to a non-existent "dedication" type */
export declare class Migration733ItemBonusFromEquipment extends MigrationBase {
    static version: number;
    slugs: Set<string>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
