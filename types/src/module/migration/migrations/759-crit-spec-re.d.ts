import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Replace critical specialization roll notes with CritSpec RE */
export declare class Migration759CritSpecRE extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
