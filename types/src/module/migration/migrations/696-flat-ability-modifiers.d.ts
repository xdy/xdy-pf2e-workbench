import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Set the "ability" property on ability FlatModifier REs */
export declare class Migration696FlatAbilityModifiers extends MigrationBase {
    static version: number;
    private abilityModPattern;
    private abbreviationMap;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
