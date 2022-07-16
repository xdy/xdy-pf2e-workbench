import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Set a speed penalty of -5 on all tower shields, plus some basic tidying */
export declare class Migration679TowerShieldSpeedPenalty extends MigrationBase {
    static version: number;
    private towerShieldSlugs;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
