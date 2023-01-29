import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Remove alignment traits from PCs and NPCs, ancestry traits from PCs  */
export declare class Migration698RemoveDerivedActorTraits extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
