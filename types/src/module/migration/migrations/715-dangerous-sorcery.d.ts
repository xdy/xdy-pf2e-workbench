import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration715DangerousSorcery extends MigrationBase {
    static version: number;
    private dangerousSorcery;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
