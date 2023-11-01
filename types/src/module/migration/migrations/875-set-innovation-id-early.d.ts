import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Set very low priority orders on AE-likes setting inventor innovation ID. */
export declare class Migration875SetInnovationIdEarly extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
