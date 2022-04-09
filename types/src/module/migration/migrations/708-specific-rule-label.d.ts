import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration708SpecificRuleLabel extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
