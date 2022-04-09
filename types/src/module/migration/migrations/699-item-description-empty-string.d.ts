import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Fix item descriptions set to `null` by `TextEditor` */
export declare class Migration699ItemDescriptionEmptyString extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
