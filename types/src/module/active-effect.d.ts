import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
/** Disable Active Effects */
export declare class ActiveEffectPF2e<TParent extends ActorPF2e | ItemPF2e | null> extends ActiveEffect<TParent> {
    constructor(data: DeepPartial<foundry.documents.ActiveEffectSource>, context?: DocumentConstructionContext<TParent>);
    static createDocuments<T extends foundry.abstract.Document>(this: ConstructorOf<T>): Promise<T[]>;
}
