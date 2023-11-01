import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Set focus pool for druids */
export declare class Migration656OtherFocusPoolSources extends MigrationBase {
    static version: number;
    private needsRuleElement;
    private increasesByOne;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
