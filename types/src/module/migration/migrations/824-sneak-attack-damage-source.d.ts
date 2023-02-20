import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Record PC sneak attack damage in an actor flag for reuse by related abilities */
export declare class Migration824SneakAttackDamageSource extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
