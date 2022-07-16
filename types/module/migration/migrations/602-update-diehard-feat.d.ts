import { MigrationBase } from "../base";
import { ActorSourcePF2e } from "@actor/data";
export declare class Migration602UpdateDiehardFeat extends MigrationBase {
    static version: number;
    requiresFlush: boolean;
    private diehardPromise;
    constructor();
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
}
