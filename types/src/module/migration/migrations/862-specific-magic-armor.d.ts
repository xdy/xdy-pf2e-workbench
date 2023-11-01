import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Attempt to infer armor intened as specific magic armor and mark it as such. */
export declare class Migration862SpecificMagicArmor extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
