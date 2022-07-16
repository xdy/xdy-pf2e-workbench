import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration636NumifyArmorData extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
