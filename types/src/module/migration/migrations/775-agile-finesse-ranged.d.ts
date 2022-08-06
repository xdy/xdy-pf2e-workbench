import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Update features that require agile, finesse or ranged weapons to reflect current melee/ranged classification */
export declare class Migration775AgileFinesseRanged extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
