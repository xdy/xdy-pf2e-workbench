import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Normalize weapon range to numeric or null, remove ability property, and let's do category and group too! */
export declare class Migration692CraftingEntryFeatReplacement extends MigrationBase {
    static version: number;
    requiresFlush: boolean;
    private slugToPromise;
    private replaceItem;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
}
