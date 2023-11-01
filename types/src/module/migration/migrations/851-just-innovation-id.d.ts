import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Set the same flag ("pf2e.innovationId") from all innovation class features  */
export declare class Migration851JustInnovationId extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
