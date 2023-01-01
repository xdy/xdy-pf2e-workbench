import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Move torch improvised from traits to otherTags */
export declare class Migration806TorchImprovisedOtherTags extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
