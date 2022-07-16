import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Numify melee bonus.value property */
export declare class Migration614NumifyMeleeBonuses extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
