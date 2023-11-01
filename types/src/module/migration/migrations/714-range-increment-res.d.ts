import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Add rule elements to feats(ures) that increase range increments or allow one to ignore/mitigate range penalties */
export declare class Migration714RangeIncrementREs extends MigrationBase {
    static version: number;
    private farLobber;
    private farShot;
    private farThrow;
    private huntPrey;
    private legendaryShot;
    private masterfulHunter;
    private shootistsEdge;
    private triangulate;
    private uncannyBombs;
    private unerringShot;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
