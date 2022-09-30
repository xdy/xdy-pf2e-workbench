import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Update roll notes on tanglefoot bags to have titled roll notes and no damage dice  */
export declare class Migration788UpdateTanglefootBags extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
