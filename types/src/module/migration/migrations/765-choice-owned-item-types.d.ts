import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** The types choices was never enforced when it only worked for weapons */
export declare class Migration765ChoiceOwnedItemTypes extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
