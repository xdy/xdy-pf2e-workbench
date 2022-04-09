import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration606SignatureSpells extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e): Promise<void>;
}
