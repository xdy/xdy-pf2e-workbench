import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add negativeHealing and recoveryMultiplier AE-like rules elements to certain feats */
export declare class Migration667HPSubProperties extends MigrationBase {
    static version: number;
    addRecoveryMultiplier(itemSource: ItemSourcePF2e, slug: string): void;
    addNegativeHealing(itemSource: ItemSourcePF2e, slug: string): void;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
