import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Consolidate all class features with multiple instances for different levels to single items */
export declare class Migration700SingleClassFeatures extends MigrationBase {
    static version: number;
    /** The first ID of each feature is the one that will stay */
    private itemIds;
    private features;
    /** Update the reference ID and name of the each feature entry */
    private migrateClass;
    /** Update the name, slug, and traits of each feature */
    private migrateFeature;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
