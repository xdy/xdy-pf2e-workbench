import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Rename `featType.value` to `category`, remove "archetype" category */
export declare class Migration834FeatCategories extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
