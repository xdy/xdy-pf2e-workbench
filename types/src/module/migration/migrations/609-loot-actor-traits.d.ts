import { MigrationBase } from "../base";
import { ActorSourcePF2e } from "@actor/data";
import { ActorSystemSource, ActorTraitsSource } from "@actor/data/base";
/** Add basic actor traits to loot actors */
export declare class Migration609LootActorTraits extends MigrationBase {
    static version: number;
    updateActor(source: MaybeWithNestedTraits): Promise<void>;
}
type MaybeWithNestedTraits = Omit<ActorSourcePF2e, "system"> & {
    system: MaybeWithNoTraits;
};
type MaybeWithNoTraits = Omit<ActorSystemSource, "traits"> & {
    value?: string[];
    traits?: ActorTraitsSource<string> | (Omit<ActorTraitsSource<string>, "rarity" | "value"> & {
        value?: string[];
        traits?: {
            value: string[];
        };
        rarity?: string | {
            value: string;
        };
        ci?: unknown[];
    });
};
export {};
