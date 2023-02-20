import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Rename references to retired compendiums */
export declare class Migration822BladeAllyConsolidation extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
