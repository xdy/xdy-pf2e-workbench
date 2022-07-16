import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Update the descriptions of several spells with new effect items */
export declare class Migration720UpdateSpellDescriptions extends MigrationBase {
    static version: number;
    private spellUUIDs;
    private spells;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
