import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Migration 929 originally failed to filter out size choicesets when updating the selection */
export declare class Migration930ChoiceSetMedium extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
