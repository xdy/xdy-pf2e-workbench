import { ItemSourcePF2e } from "@item/data/index.ts";
import { MigrationBase } from "../base.ts";
/**
 * Move weapon specialization to rule elements.
 * Note that several classes have their own ad-hoc "weapon specialization" that inject a roll option to trick the system
 */
export declare class Migration857WeaponSpecializationRE extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
