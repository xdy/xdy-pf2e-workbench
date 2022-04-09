import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Correct the usage and misspelled icon filename for handwraps of mighty blows */
export declare class Migration665HandwrapsCorrections extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
