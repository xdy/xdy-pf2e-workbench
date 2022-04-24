import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove maxTaken property from feats leftover from development */
export declare class Migration740MaxTakable extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
