import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert `LinkedProficiency` rules elements to `MartialProficiency` ones, apply to gunslinger class */
export declare class Migration704MartialProficiencyRE extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
