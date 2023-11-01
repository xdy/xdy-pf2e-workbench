import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove physical item data from melee items */
export declare class Migration637CleanMeleeItems extends MigrationBase {
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
