import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration744MigrateSpellHeighten extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e): Promise<void>;
}
