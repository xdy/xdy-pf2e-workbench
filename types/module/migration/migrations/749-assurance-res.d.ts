import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration749AssuranceREs extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
