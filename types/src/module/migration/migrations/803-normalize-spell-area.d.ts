import type { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Ensure spell-area values are numbers, null out area object if not in use */
export declare class Migration803NormalizeSpellArea extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: MaybeWithAreasize): Promise<void>;
}
type MaybeWithAreasize = ItemSourcePF2e & {
    system: {
        areasize?: unknown;
        "-=areasize"?: unknown;
    };
};
export {};
