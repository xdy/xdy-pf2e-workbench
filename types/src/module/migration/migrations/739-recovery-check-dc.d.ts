import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration739RecoveryCheckDC extends MigrationBase {
    static version: number;
    private toughness;
    private defyDeath;
    private mountainsStoutness;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
