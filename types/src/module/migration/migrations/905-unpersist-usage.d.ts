import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove `usage` properties from items with only a single (or no) usage */
export declare class Migration905UnpersistUsage extends MigrationBase {
    static version: number;
    updateItem(source: MaybeWithToBeDeletedUsage): Promise<void>;
}
type MaybeWithToBeDeletedUsage = ItemSourcePF2e & {
    system: {
        "-=usage"?: null;
    };
};
export {};
