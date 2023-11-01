import type { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert `range` and `maxRange` properties of Strike rule elements to single `RangeData` object */
export declare class Migration868StrikeRERange extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
