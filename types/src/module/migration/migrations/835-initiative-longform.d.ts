import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Converts sheet selected skills from shortform (ath) to longform (athletics) */
export declare class Migration835InitiativeLongform extends MigrationBase {
    static version: number;
    updateActor(actor: ActorSourcePF2e): Promise<void>;
}
