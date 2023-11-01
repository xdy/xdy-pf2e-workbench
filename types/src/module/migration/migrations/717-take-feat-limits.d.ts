import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Indicate whether a feat must be taken at level 1 or may only be taken a limited number of times */
export declare class Migration717TakeFeatLimits extends MigrationBase {
    static version: number;
    private levelOneOnly;
    private maxTakeable;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
