import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration674StableHomebrewTagIDs extends MigrationBase {
    static version: number;
    private homebrewKeys;
    private homebrewTags;
    private updateDocumentTags;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
    migrate(): Promise<void>;
}
