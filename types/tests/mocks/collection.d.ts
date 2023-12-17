import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
/** In Foundry this is actually a subclass of Map, but it incompatibly extends it at several points. */
export declare class MockCollection<V> {
    #private;
    constructor(entries?: [string, V][]);
    [Symbol.iterator](): IterableIterator<V>;
    get size(): number;
    get contents(): V[];
    get(key: string): V | null;
    set(key: string, value: V): MockCollection<V>;
    has(key: string): boolean;
    find(predicate: (value: V) => boolean): V | undefined;
    some(predicate: (value: V) => boolean): boolean;
    filter(predicate: (value: V) => boolean): V[];
    map<T>(callback: (value: V) => T): T[];
    delete(key: string): boolean;
    clear(): void;
}
export declare class MockWorldCollection<V extends {
    readonly parent: null;
}> extends MockCollection<V> {
}
export declare class MockActors extends MockWorldCollection<ActorPF2e<null>> {
    tokens: Record<string, ActorPF2e | undefined>;
    documentClass: typeof ActorPF2e;
}
export declare class MockItems extends MockWorldCollection<ItemPF2e<null>> {
    tokens: Record<string, ActorPF2e | undefined>;
    documentClass: typeof ItemPF2e;
}
