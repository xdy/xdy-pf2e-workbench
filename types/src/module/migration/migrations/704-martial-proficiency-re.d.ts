import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert `LinkedProficiency` rules elements to `MartialProficiency` ones, apply to gunslinger class */
export declare class Migration704MartialProficiencyRE extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
