import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
/** Convert heritage "feats" be of type "heritage" */
export declare class Migration610SetHeritageFeatType extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
