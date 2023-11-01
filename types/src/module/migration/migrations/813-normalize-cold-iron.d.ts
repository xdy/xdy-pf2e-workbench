import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Normalize "cold-iron" slug in armor, weapon and melee items */
export declare class Migration813NormalizeColdIron extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: MaybeWithOldMaterialData): Promise<void>;
}
type MaybeWithOldMaterialData = ItemSourcePF2e & {
    system: {
        preciousMaterial?: {
            value?: unknown;
        };
        preciousMaterialGrade?: {
            value?: unknown;
        };
    };
};
export {};
