import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove `group` property that got wrongly stored in some item system data */
export declare class Migration860RMGroup extends MigrationBase {
    static version: number;
    updateItem(source: MaybeWithDeletableGroup): Promise<void>;
}
type MaybeWithDeletableGroup = ItemSourcePF2e & {
    system: {
        "-=group"?: unknown;
    };
};
export {};
