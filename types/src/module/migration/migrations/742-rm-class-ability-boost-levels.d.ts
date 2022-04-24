import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove ability boost levels data from class items */
export declare class Migration742RMAbilityBoostLevels extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
