import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Grant an extra fist attack from the "Powerful Fist" and "Martial Artist Dedication" items */
export declare class Migration713FistToStrikeRE extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
