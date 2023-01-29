import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration674StableHomebrewTagIDs extends MigrationBase {
    static version: number;
    private homebrewKeys;
    private homebrewTags;
    private updateDocumentTags;
    updateActor(source: MaybeWithExtraNestedTraits): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
    migrate(): Promise<void>;
}
type MaybeWithExtraNestedTraits = ActorSourcePF2e & {
    system: {
        traits: {
            traits?: {
                value: string[];
            };
        };
    };
};
export {};
