import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration654ActionTypeAndCount extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e): Promise<void>;
}
