import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Fix precious material value of "sovereign steel" */
export declare class Migration641SovereignSteelValue extends MigrationBase {
    static version: number;
    updateItem(source: MaybeWithOldMaterialData): Promise<void>;
}
type MaybeWithOldMaterialData = ItemSourcePF2e & {
    system: {
        preciousMaterial?: {
            value?: string | null;
        };
        preciousMaterialGrade?: {
            value?: unknown;
        };
    };
};
export {};
