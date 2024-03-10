import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Adjust weapon trait toggles to use "selected" instead of "selection" */
export declare class Migration919WeaponToggleStructure extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
