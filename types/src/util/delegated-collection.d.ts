/** A proxy for a Collection that does not inherit from it, allowing it to work for getProperty() calls */
export declare class DelegatedCollection<V> {
    #private;
    constructor(entries?: [string, V][]);
    [Symbol.iterator](): IterableIterator<V>;
    get size(): number;
    get contents(): V[];
    get<T extends V = V>(key: Maybe<string>, { strict }: {
        strict: true;
    }): T;
    get<T extends V = V>(key: string, options?: CollectionGetOptions): T | undefined;
    getName<T extends V = V>(name: Maybe<string>, { strict }: {
        strict: true;
    }): T;
    getName<T extends V = V>(name: string, options?: CollectionGetOptions): T | undefined;
    set(key: string, value: V): this;
    has(key: string): boolean;
    find(predicate: (value: V) => boolean): V | undefined;
    some(predicate: (value: V) => boolean): boolean;
    filter<T extends V = V>(condition: (value: V) => value is T): T[];
    filter<T extends V = V>(condition: (value: V) => unknown): T[];
    map<T>(callback: (value: V) => T): T[];
    flatMap<U>(callback: (value: V, index: number, array: V[]) => U | readonly U[]): U[];
    delete(key: string): boolean;
    clear(): void;
}
