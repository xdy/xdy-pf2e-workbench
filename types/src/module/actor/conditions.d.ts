import { ConditionPF2e } from "@item";
import { ConditionSlug, PersistentDamagePF2e } from "@item/condition";
import { ActorPF2e } from "./base";
/** A collection of conditions on an actor, filterable by whether they're active or stored/temporary */
declare class ActorConditions<TActor extends ActorPF2e> extends Collection<ConditionPF2e<TActor>> {
    #private;
    /** Return an array of only active conditions */
    get active(): ConditionPF2e<TActor>[];
    /** Return an array of only stored conditions */
    get stored(): ConditionPF2e<TActor>[];
    /** Start empty */
    constructor();
    /** Provide additional options for retrieving a condition */
    get(key: Maybe<string>, options: {
        strict: true;
        active?: boolean | null;
        temporary?: boolean | null;
    }): ConditionPF2e<TActor>;
    get(key: string, options?: ConditionsGetOptions): ConditionPF2e<TActor> | undefined;
    set(id: string, condition: ConditionPF2e<TActor>): this;
    /** No deletions: a new instance is created every data preparation cycle */
    delete(): false;
    bySlug(slug: "persistent-damage", options?: ConditionsBySlugOptions): PersistentDamagePF2e<TActor>[];
    bySlug(slug: ConditionSlug, options?: ConditionsBySlugOptions): ConditionPF2e<TActor>[];
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
