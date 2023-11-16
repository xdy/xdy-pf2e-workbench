import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration674StableHomebrewTagIDs extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: MaybeWithExtraNestedTraits): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
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
