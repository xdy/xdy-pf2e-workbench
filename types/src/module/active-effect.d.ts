import type { ActorPF2e } from "@actor";
import type { AbstractEffectPF2e, ItemPF2e } from "@item";
export declare class ActiveEffectPF2e<TParent extends ActorPF2e | ItemPF2e | null> extends ActiveEffect<TParent> {
    /** Create an active effect from an (abstract) effect for use in token effect icons */
    static fromEffect<TActor extends ActorPF2e>(effect: AbstractEffectPF2e<TActor>): ActiveEffectPF2e<TActor>;
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: User): Promise<boolean | void>;
}
