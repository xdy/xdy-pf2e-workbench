import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Clear the top level of Lay on Hands (and Touch of Corruption) damage so that it is not added to overlays */
export declare class Migration897ClearLayOnHandsDamage extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
