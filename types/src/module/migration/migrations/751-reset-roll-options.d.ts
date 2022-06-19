import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Reset all roll options now that most are no longer stored on actors */
export declare class Migration751ResetRollOptions extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
