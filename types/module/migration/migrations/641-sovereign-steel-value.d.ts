import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Fix precious material value of "sovereign steel" */
export declare class Migration641SovereignSteelValue extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
