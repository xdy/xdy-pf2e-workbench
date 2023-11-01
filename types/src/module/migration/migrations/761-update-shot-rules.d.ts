import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Update rule elements on Double Shot, Triple Shot, and Stance: Multishot Stance */
export declare class Migration761ShotRules extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
