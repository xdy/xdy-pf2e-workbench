import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Prune traits from actors and items that are invalid for the given type */
export declare class Migration828PruneInvalidTraits extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
