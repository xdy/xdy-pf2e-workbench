import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Don't store the max value of the focus pool */
export declare class Migration651EphemeralFocusPool extends MigrationBase {
    static version: number;
    private needsRuleElement;
    private increasesByOne;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
