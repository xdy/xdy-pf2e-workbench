import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert weapon familiarity `ActiveEffect`s to Rule Elements */
export declare class Migration687FamiliarityAEsToREs extends MigrationBase {
    static version: number;
    private isFamiliarityAE;
    private toRuleElement;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
