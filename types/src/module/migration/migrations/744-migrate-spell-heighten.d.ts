import { ItemSourcePF2e } from "@item/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration744MigrateSpellHeighten extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e): Promise<void>;
}