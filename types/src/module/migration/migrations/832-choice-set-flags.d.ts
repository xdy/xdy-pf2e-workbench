import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Ensure flags in Choice Set rule elements are in dromedary case */
export declare class Migration832ChoiceSetFlags extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
