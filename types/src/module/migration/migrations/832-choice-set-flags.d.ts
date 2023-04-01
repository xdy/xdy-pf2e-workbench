import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Ensure flags in Choice Set rule elements are in dromedary case */
export declare class Migration832ChoiceSetFlags extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
