import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Restore options array to Strike REs on Animal Instinct class features */
export declare class Migration763RestoreAnimalStrikeOptions extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
