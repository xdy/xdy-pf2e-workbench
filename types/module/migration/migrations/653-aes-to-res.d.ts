import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove `ActiveEffect`s from classes, convert AE changes on several item types to AE-likes */
export declare class Migration653AEstoREs extends MigrationBase {
    static version: number;
    /** Remove the AE if the originating item is a class and is modifying any of the below property paths */
    private pathsToRemove;
    private isRemovableAE;
    private isRemoveableChange;
    private fixClassKeyAbilities;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
