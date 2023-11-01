import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Consolidate all class features with multiple instances for different levels to single items */
export declare class Migration700SingleClassFeatures extends MigrationBase {
    #private;
    static version: number;
    /** The first ID of each feature is the one that will stay */
    private itemIds;
    private features;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
