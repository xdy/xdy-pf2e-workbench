import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration618MigrateItemImagePaths extends MigrationBase {
    static version: number;
    readonly IMAGE_PATHS: Record<string, ImagePath>;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
