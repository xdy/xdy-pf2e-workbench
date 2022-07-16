import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Restore options array to Strike REs on Animal Instinct class features */
export declare class Migration763RestoreAnimalStrikeOptions extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
