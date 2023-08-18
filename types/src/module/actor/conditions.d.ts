import { ConditionPF2e } from "@item";
import { ConditionSlug, PersistentDamagePF2e } from "@item/condition/index.ts";
import { ActorPF2e } from "./base.ts";
/** A wrapper for collections of conditions on an actor, filterable by whether they're active or stored/temporary */
declare class ActorConditions<TActor extends ActorPF2e> {
    #private;
    /** Return an array of only active conditions */
    get active(): ConditionPF2e<TActor>[];
    /** Return an array of only stored conditions */
    get stored(): ConditionPF2e<TActor>[];
    /** Convenience getters for active badged conditions, especially for use by @actor resolvables in rule elements */
    get clumsy(): ConditionPF2e<TActor> | null;
    get doomed(): ConditionPF2e<TActor> | null;
    get drained(): ConditionPF2e<TActor> | null;
    get dying(): ConditionPF2e<TActor> | null;
    get enfeebled(): ConditionPF2e<TActor> | null;
    get frightened(): ConditionPF2e<TActor> | null;
    get sickened(): ConditionPF2e<TActor> | null;
    get slowed(): ConditionPF2e<TActor> | null;
    get stunned(): ConditionPF2e<TActor> | null;
    get stupefied(): ConditionPF2e<TActor> | null;
    get wounded(): ConditionPF2e<TActor> | null;
    /** Iterate over the values of `#idMap` */
    [Symbol.iterator](): IterableIterator<ConditionPF2e<TActor>>;
    /** Provide additional options for retrieving a condition */
    get(key: Maybe<string>, options: {
        strict: true;
        active?: boolean | null;
        temporary?: boolean | null;
    }): ConditionPF2e<TActor>;
    get(key: string, options?: ConditionsGetOptions): ConditionPF2e<TActor> | undefined;
    has(id: string): boolean;
    set(id: string, condition: ConditionPF2e<TActor>): this;
    filter(condition: (value: ConditionPF2e<TActor>) => boolean): ConditionPF2e<TActor>[];
    some(condition: (value: ConditionPF2e<TActor>) => boolean): boolean;
    every(condition: (value: ConditionPF2e<TActor>) => boolean): boolean;
    map<T>(transformer: (value: ConditionPF2e<TActor>) => T): T[];
    flatMap<T>(transformer: (value: ConditionPF2e<TActor>) => T | T[] | never[]): T[];
    /** No deletions: a new instance is created every data preparation cycle */
    delete(): false;
    /**
     * Get an array of conditions by slug
     * The "dead" slug is permitted due to `StatusEffectsPF2e`'s usage of this class, though it will always return an
     * empty array.
     */
    bySlug(slug: "persistent-damage", options?: ConditionsBySlugOptions): PersistentDamagePF2e<TActor>[];
    bySlug(slug: "dead", options?: ConditionsBySlugOptions): never[];
    bySlug(slug: ConditionSlug | "dead", options?: ConditionsBySlugOptions): ConditionPF2e<TActor>[];
}
interface ConditionsGetOptions extends CollectionGetOptions {
    /** Filter by the active state of the condition: `null` will return one in either state */
    active?: boolean | null;
    /**
     * Filter by the whether the condition is temporary (in-memory) or stored on the actor: `null` will return
     * a condition of either kind
     */
    temporary?: boolean | null;
}
type ConditionsBySlugOptions = Omit<ConditionsGetOptions, "strict">;
export { ActorConditions };
