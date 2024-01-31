import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Add new rule elements to various classes and feats (covers Gunslinger, Inventor, and Swashbuckler). */
export declare class Migration916NewPCToys extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
