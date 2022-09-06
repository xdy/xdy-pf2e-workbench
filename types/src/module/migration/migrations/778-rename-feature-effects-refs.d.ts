import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Rename references to retired compendiums */
export declare class Migration778RenameRetiredPackRefs extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
