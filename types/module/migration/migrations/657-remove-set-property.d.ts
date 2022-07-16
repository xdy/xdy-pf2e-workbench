import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
import { ActorSourcePF2e } from "@actor/data";
export declare class Migration657RemoveSetProperty extends MigrationBase {
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
