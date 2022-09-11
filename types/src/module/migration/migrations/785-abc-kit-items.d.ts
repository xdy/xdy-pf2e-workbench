import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert kit and ABC item pack/id references to UUIDs */
export declare class Migration785ABCKitItemUUIDs extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
