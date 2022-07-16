import { MigrationBase } from "../base";
import { ActorSourcePF2e } from "@actor/data";
export declare class Migration611UpdateToughnessMountainsStoutness extends MigrationBase {
    static version: number;
    requiresFlush: boolean;
    private featSlugs;
    private featsPromise;
    constructor();
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
}
