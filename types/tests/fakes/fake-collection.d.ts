import type { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
/** In Foundry this is actually a subclass of Map, but it incompatibly extends it at several points. */
export declare class FakeCollection<V> {
    #private;
    constructor(entries?: [string, V][]);
    [Symbol.iterator](): IterableIterator<V>;
    get size(): number;
    get contents(): V[];
    get(key: string): V | null;
    set(key: string, value: V): FakeCollection<V>;
    has(key: string): boolean;
    find(predicate: (value: V) => boolean): V | undefined;
    some(predicate: (value: V) => boolean): boolean;
    filter(predicate: (value: V) => boolean): V[];
    delete(key: string): boolean;
    clear(): void;
}
export declare class FakeWorldCollection<V extends {
    data: object;
}> extends FakeCollection<V> {
}
export declare class FakeActors extends FakeWorldCollection<ActorPF2e> {
    tokens: Record<string, ActorPF2e | undefined>;
    documentClass: typeof ActorPF2e;
    constructor(entries?: [string, ActorPF2e][]);
}
export declare class FakeItems extends FakeWorldCollection<ActorPF2e> {
    tokens: Record<string, ActorPF2e | undefined>;
    documentClass: typeof ItemPF2e;
    constructor(entries?: [string, ActorPF2e][]);
}
