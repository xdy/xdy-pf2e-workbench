import { ItemSourcePF2e } from "@item/data";
import { Migration702REFormulasAtInstanceLevel } from "./702-re-formulas-at-instance-level";
export declare class Migration709REFormulasAtInstanceLevelRedux extends Migration702REFormulasAtInstanceLevel {
    static version: number;
    private walkObject;
    private findAndMigrateFormulas;
    /** Migrate nested roll formulas on rule elements */
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
