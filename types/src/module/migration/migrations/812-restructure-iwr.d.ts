import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Move IWR data to `actor.system.attributes` */
export declare class Migration812RestructureIWR extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    /** Sluggify precious material types, normalize precious material grades */
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
