import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";

export declare class ActiveEffectPF2e<TParent extends ActorPF2e | ItemPF2e | null> extends ActiveEffect<TParent> {
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: User): Promise<boolean | void>;
}
