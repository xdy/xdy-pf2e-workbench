import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Fix spelling of the "talisman" `consumableType` */
export declare class Migration630FixTalismanSpelling extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
