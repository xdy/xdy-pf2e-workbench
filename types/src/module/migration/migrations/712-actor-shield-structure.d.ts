import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Make attributes.shield ephemeral on PCs and NPCs */
export declare class Migration712ActorShieldStructure extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
