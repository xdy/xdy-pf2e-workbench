import { MigrationBase } from "../base";
import { ActorSourcePF2e } from "@actor/data";
export declare class Migration612NormalizeRarities extends MigrationBase {
    static version: number;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
}
