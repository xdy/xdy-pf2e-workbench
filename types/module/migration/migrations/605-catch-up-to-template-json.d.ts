import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
import { ActorSourcePF2e } from "@actor/data";
/** Catch up actors and items to the current template.json spec */
export declare class Migration605CatchUpToTemplateJSON extends MigrationBase {
    static version: number;
    private addEffects;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
    updateItem(itemData: ItemSourcePF2e, actorData: ActorSourcePF2e): Promise<void>;
}
