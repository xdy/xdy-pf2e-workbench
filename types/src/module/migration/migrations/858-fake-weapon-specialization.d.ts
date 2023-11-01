import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/**
 * Several classes have their own ad-hoc "weapon specialization" that injected a roll option to trick the system, which were
 * removed for a more "correct" solution, but unfortunately it turns out they're actually required for things like barbarian rage.
 */
export declare class Migration858FakeWeaponSpecialization extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
