import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Wipe URL sources (typically Archives of Nethys) */
export declare class Migration766WipeURLSources extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
