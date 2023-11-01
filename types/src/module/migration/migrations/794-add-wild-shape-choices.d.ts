import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Add AE-likes forming a UUID choice set for Wild Shape effect  */
export declare class Migration794AddWildShapeChoices extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
