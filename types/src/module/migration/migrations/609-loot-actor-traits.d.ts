import { MigrationBase } from "../base";
import { ActorSourcePF2e } from "@actor/data";
/** Add basic actor traits to loot actors */
export declare class Migration609LootActorTraits extends MigrationBase {
    static version: number;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
}
