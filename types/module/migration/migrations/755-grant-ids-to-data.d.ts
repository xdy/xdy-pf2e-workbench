import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Convert grant flags containing IDs to `ItemGrantData` objects */
export declare class Migration755GrantIdsToData extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
