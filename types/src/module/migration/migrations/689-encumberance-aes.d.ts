import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add AE-likes to set encumbrance "bonuses" */
export declare class Migration689EncumberanceActiveEffects extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
