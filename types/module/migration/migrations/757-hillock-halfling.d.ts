import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add recovery bonus to Hillock Halfling heritage */
export declare class Migration757HillockHalfling extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
