import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Ensure spells have a minimum level of one */
export declare class Migration688ClampSpellLevel extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
