import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Correct the structure of spell damage in case it slipped past a previous migration */
export declare class Migration703SpellDamageStructure extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
