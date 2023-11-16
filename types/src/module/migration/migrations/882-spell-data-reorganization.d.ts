import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Simplify data structure of spells, add damage `kinds` */
export declare class Migration882SpellDataReorganization extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: DeepPartial<ItemSourcePF2e>, actorSource?: ActorSourcePF2e, 
    /** Whether this is the top level of the spell item rather than internal partial data */
    { topLevel }?: {
        topLevel?: boolean | undefined;
    }): Promise<void>;
}
