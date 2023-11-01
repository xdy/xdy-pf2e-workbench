import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert bracketed AE-like rule elements changing ability scores to instead change attribute modifiers */
export declare class Migration854BracketedAbilityScoresToModifiers extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
