import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove rule elements from Panache class feature, add slugs to Vivacious Speed REs */
export declare class Migration764PanacheVivaciousREs extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
