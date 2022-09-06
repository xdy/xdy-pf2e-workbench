import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add the new Aura rule element to the Marshal Dedication feat */
export declare class Migration768AddNewAuras extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
