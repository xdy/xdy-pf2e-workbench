import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Focus Points became an actor resource. Relies on items running after actor */
export declare class Migration649FocusToActor extends MigrationBase {
    static version: number;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
