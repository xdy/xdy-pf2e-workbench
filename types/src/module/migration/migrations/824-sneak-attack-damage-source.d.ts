import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Record PC sneak attack damage in an actor flag for reuse by related abilities */
export declare class Migration824SneakAttackDamageSource extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
