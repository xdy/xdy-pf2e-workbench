import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Move ancestry vision features from independent items to system data on ancestry items */
export declare class Migration670AncestryVision extends MigrationBase {
    #private;
    static version: number;
    private DARKVISION_ID;
    private LOWLIGHTVISION_ID;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    /** Only update independent world items */
    updateItem(source: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
