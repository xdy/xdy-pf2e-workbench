import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove manually set magic school and tradition traits from spells */
export declare class Migration660DerivedSpellTraits extends MigrationBase {
    static version: number;
    private derivedTraits;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
