import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove duplicate Recall Knowledge action items */
export declare class Migration799RMRecallKnowledgeDuplicates extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
