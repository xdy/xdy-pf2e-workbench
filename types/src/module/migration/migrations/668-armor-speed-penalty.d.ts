import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove RuleElement implementation of armor speed penalties  */
export declare class Migration668ArmorSpeedPenalty extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
