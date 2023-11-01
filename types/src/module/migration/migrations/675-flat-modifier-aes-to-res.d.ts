import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert experimental FlatModifier `ActiveEffect`s to Rule Elements */
export declare class Migration675FlatModifierAEsToREs extends MigrationBase {
    #private;
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
