import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Move IWR data to `actor.system.attributes` */
export declare class Migration812RestructureIWR extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    /** Sluggify precious material types, normalize precious material grades */
    updateItem(source: MaybeWithOldMaterialData): Promise<void>;
}
type MaybeWithOldMaterialData = ItemSourcePF2e & {
    system: {
        preciousMaterial?: {
            value?: unknown;
        };
        preciousMaterialGrade?: {
            value?: unknown;
        };
    };
};
export {};
