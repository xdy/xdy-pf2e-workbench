import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add negative healing to basic undead benefits */
export declare class Migration818BasicUndeadNegativeHealing extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
