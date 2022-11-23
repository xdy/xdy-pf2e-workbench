import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Fix the predicate on the Precise Strike's DamageDice rule element  */
export declare class Migration789UpdatePreciseStrike extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
