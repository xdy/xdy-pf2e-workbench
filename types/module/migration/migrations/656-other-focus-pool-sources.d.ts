import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Set focus pool for druids */
export declare class Migration656OtherFocusPoolSources extends MigrationBase {
    static version: number;
    private needsRuleElement;
    private increasesByOne;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
