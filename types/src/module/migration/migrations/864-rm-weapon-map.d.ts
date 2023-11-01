import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove MAP property from weapon system data, transferring to a rule element if set. */
export declare class Migration864RemoveWeaponMAP extends MigrationBase {
    static version: number;
    updateItem(source: MaybeWithMAPProperty): Promise<void>;
}
type MaybeWithMAPProperty = ItemSourcePF2e & {
    system: {
        MAP?: unknown;
        "-=MAP"?: null;
    };
};
export {};
