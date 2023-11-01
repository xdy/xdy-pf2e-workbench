import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Start recording the schema version and other details of a migration */
export declare class Migration642TrackSchemaVersion extends MigrationBase {
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
