import { ActorPF2e } from "@actor";
import type { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { BaseRawModifier } from "@actor/modifiers";
import { TokenDocumentPF2e } from "@scene";
import { BracketedValue, RuleElementSource, RuleElementData, RuleValue, REPreCreateParameters, REPreDeleteParameters } from "./data";
/**
 * Rule Elements allow you to modify actorData and tokenData values when present on items. They can be configured
 * in the item's Rules tab which has to be enabled using the "Advanced Rule Element UI" system setting.
 *
 * @category RuleElement
 */
declare abstract class RuleElementPF2e {
    item: Embedded<ItemPF2e>;
    data: RuleElementData;
    key: string;
    slug: string | null;
    protected suppressWarnings: boolean;
    /** A list of actor types on which this rule element can operate (all unless overridden) */
    protected static validActorTypes: ActorType[];
    /**
     * @param data unserialized JSON data from the actual rule input
     * @param item where the rule is persisted on
     */
    constructor(data: RuleElementSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    get actor(): ActorPF2e;
    /** Retrieves the token from the actor, or from the active tokens. */
    get token(): TokenDocumentPF2e | null;
    get label(): string;
    get predicate(): this["data"]["predicate"];
    /** The place in order of application (ascending), among an actor's list of rule elements */
    get priority(): number;
    /** Globally ignore this rule element. */
    get ignored(): boolean;
    set ignored(value: boolean);
    /** Test this rule element's predicate, if present */
    test(rollOptions?: string[]): boolean;
    /** Send a deferred warning to the console indicating that a rule element's validation failed */
    failValidation(...message: string[]): void;
    /**
     * Callback used to parse and look up values when calculating rules. Parses strings that look like
     * {actor|x.y.z}, {item|x.y.z} or {rule|x.y.z} where x.y.z is the path on the current actor, item or rule.
     * It's useful if you want to include something like the item's ID in a modifier selector (for applying the
     * modifier only to a specific weapon, for example), or include the item's name in some text.
     *
     * Example:
     * {
     *   "key": "PF2E.RuleElement.Note",
     *   "selector": "will",
     *   "text": "<b>{item|name}</b> A success on a Will save vs fear is treated as a critical success.",
     *   "predicate": {
     *       "all": ["fear"]
     *   }
     * }
     *
     * @param source string that should be parsed
     * @param ruleData current rule data
     * @param itemData current item data
     * @param actorData current actor data
     * @return the looked up value on the specific object
     */
    resolveInjectedProperties(source?: string): string;
    /**
     * Parses the value attribute on a rule.
     *
     * @param valueData can be one of 3 different formats:
     * * {value: 5}: returns 5
     * * {value: "4 + @details.level.value"}: uses foundry's built in roll syntax to evaluate it
     * * {
     *      field: "item|data.level.value",
     *      brackets: [
     *          {start: 1, end: 4, value: 5}],
     *          {start: 5, end: 9, value: 10}],
     *   }: compares the value from field to >= start and <= end of a bracket and uses that value
     * @param ruleData current rule data
     * @param item current item data
     * @param actorData current actor data
     * @param defaultValue if no value is found, use that one
     * @return the evaluated value
     */
    protected resolveValue(valueData?: RuleValue | BracketedValue<string | number | object> | undefined, defaultValue?: Exclude<RuleValue, BracketedValue>, { evaluate, resolvables }?: {
        evaluate?: boolean | undefined;
        resolvables?: {} | undefined;
    }): number | string | boolean | object | null;
    private isBracketedValue;
}
interface RuleElementOptions {
    /** If data validation fails for any reason, do not emit console warnings */
    suppressWarnings?: boolean;
}
interface RuleElementPF2e {
    /**
     * Run between Actor#applyActiveEffects and Actor#prepareDerivedData. Generally limited to ActiveEffect-Like
     * elements
     */
    onApplyActiveEffects?(): void;
    /**
     * Run in Actor#prepareDerivedData which is similar to an init method and is the very first thing that is run after
     * an actor.update() was called. Use this hook if you want to save or modify values on the actual data objects
     * after actor changes. Those values should not be saved back to the actor unless we mess up.
     *
     * This callback is run for each rule in random order and is run very often, so watch out for performance.
     */
    beforePrepareData?(): void;
    /** Run after all actor preparation callbacks have been run so you should see all final values here. */
    afterPrepareData?(): void;
    /**
     * Run just prior to a check roll, passing along roll options already accumulated
     * @param domains Applicable predication domains for pending check
     * @param rollOptions Currently accumulated roll options for the pending check
     */
    beforeRoll?(domains: string[], rollOptions: string[]): void;
    /** Runs before the rule's parent item's owning actor is updated */
    preUpdateActor?(): Promise<void>;
    /**
     * Runs before this rules element's parent item is created. The item is temporarilly constructed. A rule element can
     * alter itself before its parent item is stored on an actor; it can also alter the item source itself in the same
     * manner.
     * @see REPreCreateParameters
     */
    preCreate?({ ruleSource, itemSource, pendingItems, context }: REPreCreateParameters): Promise<void>;
    /**
     * Runs before this rules element's parent item is created. The item is temporarilly constructed. A rule element can
     * alter itself before its parent item is stored on an actor; it can also alter the item source itself in the same
     * manner.
     * @see REPreDeleteParameters
     */
    preDelete?({ pendingItems, context }: REPreDeleteParameters): Promise<void>;
    /**
     * Runs after an item holding this rule is added to an actor. If you modify or add the rule after the item
     * is already present on the actor, nothing will happen. Rules that add toggles won't work here since this method is
     * only called on item add.
     *
     * @param actorUpdates The first time a rule is run it receives an empty object. After all rules set various values
     * on the object, this object is then passed to actor.update(). This is useful if you want to set specific values on
     * the actor when an item is added. Keep in mind that the object for actor.update() is flattened, e.g.
     * {'data.attributes.hp.value': 5}.
     */
    onCreate?(actorUpdates: Record<string, unknown>): void;
    /**
     * Run at the start of the actor's turn. Similar to onCreate and onDelete, this provides an opportunity to make
     * updates to the actor.
     * @param actorUpdates A record containing update data for the actor
     */
    onTurnStart?(actorUpdates: Record<string, unknown>): void | Promise<void>;
    /**
     * Runs after an item holding this rule is removed from an actor. This method is used for cleaning up any values
     * on the actorData or token objects (e.g., removing temp HP).
     *
     * @param actorData data of the actor that holds the item
     * @param item the removed item data
     * @param actorUpdates see onCreate
     * @param tokens see onCreate
     */
    onDelete?(actorUpdates: Record<string, unknown>): void;
    /** An optional method for excluding damage modifiers and extra dice */
    applyDamageExclusion?(modifiers: BaseRawModifier[]): void;
}
export { RuleElementPF2e, RuleElementOptions };
