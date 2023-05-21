import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration624RemoveTokenEffectIconFlags extends MigrationBase {
    static version: number;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
    updateToken(tokenData: foundry.documents.TokenSource): Promise<void>;
}
