import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** The types choices was never enforced when it only worked for weapons */
export declare class Migration765ChoiceOwnedItemTypes extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
