import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Normalize "cold-iron" slug in armor, weapon and melee items */
export declare class Migration813NormalizeColdIron extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
