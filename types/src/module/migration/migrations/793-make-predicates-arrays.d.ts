import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert predicate properties of rule elements to arrays  */
export declare class Migration793MakePredicatesArrays extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
