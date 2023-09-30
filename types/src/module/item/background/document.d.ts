import type { ActorPF2e, CharacterPF2e } from "@actor";
import { ABCItemPF2e } from "@item";
import { BackgroundSource, BackgroundSystemData } from "./data.ts";
import { BackgroundTrait } from "./types.ts";
declare class BackgroundPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    get traits(): Set<BackgroundTrait>;
    /** Set a skill feat granted by a GrantItem RE as one of this background's configured items */
    prepareSiblingData(this: BackgroundPF2e<ActorPF2e>): void;
    prepareActorData(this: BackgroundPF2e<CharacterPF2e>): void;
}
interface BackgroundPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    readonly _source: BackgroundSource;
    system: BackgroundSystemData;
}
export { BackgroundPF2e };
