import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Suppress the "no-crowbar" penalty applied to the Force Open action */
export declare class Migration781SuppressNoCrowbar extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
