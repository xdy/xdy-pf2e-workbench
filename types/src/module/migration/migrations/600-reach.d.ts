import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
export declare class Migration600Reach extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e): Promise<void>;
}
