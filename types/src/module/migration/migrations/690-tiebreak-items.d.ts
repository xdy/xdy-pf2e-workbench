import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Add AE-likes to certain items that give the owner a higher tiebreak priority */
export declare class Migration690InitiativeTiebreakItems extends MigrationBase {
    /** Nice */
    static version: number;
    /** Feats and equipment with a tie-breaking feature */
    private itemSlugs;
    /** Sets the tiebreak priority for the item owner from 2 (PCs) to 0 */
    private rule;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
