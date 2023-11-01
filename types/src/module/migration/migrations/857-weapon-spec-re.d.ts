import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/**
 * Move weapon specialization to rule elements.
 */
export declare class Migration857WeaponSpecializationRE extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
