import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Normalize armor range to numeric or null, remove ability property, and let's do category and group too! */
export declare class Migration693ArmorCategoryGroup extends MigrationBase {
    static version: number;
    private isOldGroupData;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
