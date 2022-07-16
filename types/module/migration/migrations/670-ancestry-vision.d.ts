import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Move ancestry vision features from independent items to system data on ancestry items */
export declare class Migration670AncestryVision extends MigrationBase {
    static version: number;
    private DARKVISION_ID;
    private LOWLIGHTVISION_ID;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    /** Only update independent world items */
    updateItem(itemSource: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
    private setAncestryVision;
}
