import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Fix melee-usage traits on combination weapons */
export declare class Migration685FixMeleeUsageTraits extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
