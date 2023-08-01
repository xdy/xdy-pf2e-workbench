import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration602UpdateDiehardFeat extends MigrationBase {
    #private;
    static version: number;
    requiresFlush: boolean;
    constructor();
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
