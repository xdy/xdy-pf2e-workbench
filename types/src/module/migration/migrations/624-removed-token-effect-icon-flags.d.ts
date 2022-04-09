import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
export declare class Migration624RemoveTokenEffectIconFlags extends MigrationBase {
    static version: number;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
    updateToken(tokenData: foundry.data.TokenSource): Promise<void>;
}
