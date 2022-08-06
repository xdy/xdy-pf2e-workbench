import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Sluggify values in condition `overrides` arrays */
export declare class Migration776SlugifyConditionOverrides extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
