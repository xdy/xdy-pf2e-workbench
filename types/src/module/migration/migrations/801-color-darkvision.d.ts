import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add color darkvision flags to fetchlings and the Resonant Reflection of Life */
export declare class Migration801ColorDarkvision extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
