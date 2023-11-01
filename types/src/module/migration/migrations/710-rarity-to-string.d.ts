import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration710RarityToString extends MigrationBase {
    static version: number;
    private updateTraits;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
