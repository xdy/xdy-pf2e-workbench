import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration716StrikeDamageSelector extends MigrationBase {
    static version: number;
    private itemsToSkip;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
