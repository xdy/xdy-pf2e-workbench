import { ItemSourcePF2e } from "@item/data";
import { Migration702REFormulasAtInstanceLevel } from "./702-re-formulas-at-instance-level";
/** Change RE formula data replacement to operate at actor and item instance levels */
export declare class Migration706FormulasAtInstanceLevelEverythingElse extends Migration702REFormulasAtInstanceLevel {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
    private replaceInlineRolls;
}
