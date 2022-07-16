import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add missing third boost from a pair of backgrounds */
export declare class Migration762UpdateBackgroundItems extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
