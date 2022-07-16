import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Move hero points from attributes to resources */
export declare class Migration686HeroPointsToResources extends MigrationBase {
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
}
