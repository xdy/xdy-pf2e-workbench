import { ItemSourcePF2e } from "@item/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Add AE-likes to set encumbrance "bonuses" */
export declare class Migration689EncumberanceActiveEffects extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
