import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Move paths of "system.custom.*" set by AE-likes to flags. */
export declare class Migration856NoSystemDotCustom extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
