import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
export declare class Migration623NumifyPotencyRunes extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
