import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Limit `stackGroup` property to consumables and treasure */
export declare class Migration906LimitStackGroup extends MigrationBase {
    static version: number;
    updateItem(source: MaybeWithToBeDeletedStackGroup): Promise<void>;
}
type MaybeWithToBeDeletedStackGroup = ItemSourcePF2e & {
    system: {
        "-=stackGroup"?: null;
    };
};
export {};
