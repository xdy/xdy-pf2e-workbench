import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Set a slug in heritages' ancestry data */
export declare class Migration823HeritageAncestrySlug extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
