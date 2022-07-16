import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Grant an extra fist attack from the "Powerful Fist" and "Martial Artist Dedication" items */
export declare class Migration713FistToStrikeRE extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
