import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Flatten several physical-item properties, remove others no longer in use */
export declare class Migration728FlattenPhysicalProperties extends MigrationBase {
    static version: number;
    private booleanKeys;
    private numericKeys;
    private stringKeys;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
