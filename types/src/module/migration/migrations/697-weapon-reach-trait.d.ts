import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Correct the reach trait on weapons */
export declare class Migration697WeaponReachTrait extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
