import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Replace the "Giant" language with "Jotun" */
export declare class Migration681GiantLanguageToJotun extends MigrationBase {
    static version: number;
    private replaceGiant;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
