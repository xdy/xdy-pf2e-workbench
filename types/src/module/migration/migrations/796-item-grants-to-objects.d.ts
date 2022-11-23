import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Convert `itemGrants` flags from arrays to `Record<string, GrantedItemData>`s */
export declare class Migration796ItemGrantsToObjects extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
