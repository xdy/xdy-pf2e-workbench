import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Fix featType properties erroneously set to a non-existent "dedication" type */
export declare class Migration732FixDedicationFeatTypes extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
