import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Remove "instinct" trait from feats */
export declare class Migration615RemoveInstinctTrait extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
