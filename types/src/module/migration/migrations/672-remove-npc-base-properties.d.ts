import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove the extra `base` subproperty of labeled values on NPCs */
export declare class Migration672RemoveNPCBaseProperties extends MigrationBase {
    static version: number;
    private removeBase;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
