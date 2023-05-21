import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove alignment traits from PCs and NPCs, ancestry traits from PCs  */
export declare class Migration698RemoveDerivedActorTraits extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
