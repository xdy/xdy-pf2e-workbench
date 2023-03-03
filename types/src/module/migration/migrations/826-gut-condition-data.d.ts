import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove unused cruft from condition data */
export declare class Migration826GutConditionData extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
