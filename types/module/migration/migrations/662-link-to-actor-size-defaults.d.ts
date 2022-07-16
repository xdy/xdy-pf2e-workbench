import { ActorPF2e } from "@actor";
import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Set default linkToActorSize flag */
export declare class Migration662LinkToActorSizeDefaults extends MigrationBase {
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateToken(tokenSource: foundry.data.TokenSource, actor: ActorPF2e): Promise<void>;
}
