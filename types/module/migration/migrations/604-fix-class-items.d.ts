import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration604FixClassItem extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e & {
        data: Record<string, unknown>;
    }): Promise<void>;
}
