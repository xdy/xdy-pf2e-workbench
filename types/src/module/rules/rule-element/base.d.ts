import type { ActorPF2e, ActorType } from "@actor";
import type { CheckModifier, DamageDicePF2e, ModifierPF2e } from "@actor/modifiers.ts";
import { ItemPF2e, type WeaponPF2e } from "@item";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import type { TokenDocumentPF2e } from "@scene/index.ts";
import { CheckCheckContext, CheckRoll } from "@system/check/index.ts";
import { LaxSchemaField } from "@system/schema-data-fields.ts";
import type { DataModelValidationOptions } from "types/foundry/common/abstract/data.d.ts";
import { BracketedValue, RuleElementSchema, RuleElementSource, RuleValue } from "./data.ts";
/**
 * Rule Elements allow you to modify actorData and tokenData values when present on items. They can be configured
 * in the item's Rules tab which has to be enabled using the "Advanced Rule Element UI" system setting.
 *
 * @category RuleElement
 */
declare abstract class RuleElementPF2e<TSchema extends RuleElementSchema = RuleElementSchema> extends foundry.abstract
    .DataModel<ItemPF2e<ActorPF2e>, TSchema> {
    #private;
    protected static _schema: LaxSchemaField<RuleElementSchema> | undefined;
    label: string;
    sourceIndex: number | null;
    protected suppressWarnings: boolean;
    /** A list of actor types on which this rule element can operate (all unless overridden) */
    protected static validActorTypes: ActorType[];
    /**
     * @param source unserialized JSON data from the actual rule input
     * @param item where the rule is persisted on
     */
    constructor(source: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): RuleElementSchema;
    /** Use a "lax" schema field that preserves properties not defined in the `DataSchema` */
    static get schema(): LaxSchemaField<RuleElementSchema>;
    get item(): this["parent"];
    get actor(): ActorPF2e;
    /** Retrieves the token from the actor, or from the active tokens. */
    get token(): TokenDocumentPF2e | null;
    /** Generate a label without a leading title (such as "Effect:") */
    protected getReducedLabel(label?: string): string;
    /** Include parent item's name and UUID in `DataModel` validation error messages */
    validate(options?: DataModelValidationOptions): boolean;
    /** Test this rule element's predicate, if present */
    protected test(rollOptions?: string[] | Set<string>): boolean;
    /** Send a deferred warning to the console indicating that a rule element's validation failed */
    protected failValidation(...message: string[]): void;
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
     * @param source The string that is to be resolved
     * @param options.warn Whether to warn on a failed resolution
     * @return the looked up value on the specific object
     */
    resolveInjectedProperties<T extends string | number | object | null | undefined>(source: T, options?: {
        injectables?: Record<string, unknown>;
        warn?: boolean;
    }): T;
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
     * @param defaultValue if no value is found, use that one
     * @return the evaluated value
     */
    resolveValue(value: unknown, defaultValue?: Exclude<RuleValue, BracketedValue> | null, { evaluate, resolvables, warn }?: ResolveValueParams): number | string | boolean | object | null;
    protected isBracketedValue(value: unknown): value is BracketedValue;
}
interface RuleElementPF2e<TSchema extends RuleElementSchema> extends foundry.abstract.DataModel<ItemPF2e<ActorPF2e>, TSchema>, ModelPropsFromSchema<RuleElementSchema> {
    constructor: typeof RuleElementPF2e<TSchema>;
    get schema(): LaxSchemaField<TSchema>;
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
    beforeRoll?(domains: string[], rollOptions: Set<string>): void;
    /**
     * Run following a check roll, passing along roll options already accumulated
     * @param domains Applicable selectors for the pending check
     * @param domains Applicable predication domains for pending check
     * @param rollOptions Currently accumulated roll options for the pending check
     */
    afterRoll?(params: RuleElementPF2e.AfterRollParams): Promise<void>;
    /** Runs before the rule's parent item's owning actor is updated */
    preUpdateActor?(): Promise<{
        create: ItemSourcePF2e[];
        delete: string[];
    }>;
    /**
     * Runs before this rules element's parent item is created. The item is temporarilly constructed. A rule element can
     * alter itself before its parent item is stored on an actor; it can also alter the item source itself in the same
     * manner.
     */
    preCreate?({ ruleSource, itemSource, pendingItems, operation }: RuleElementPF2e.PreCreateParams): Promise<void>;
    /**
     * Runs before this rules element's parent item is created. The item is temporarilly constructed. A rule element can
     * alter itself before its parent item is stored on an actor; it can also alter the item source itself in the same
     * manner.
     */
    preDelete?({ pendingItems, operation }: RuleElementPF2e.PreDeleteParams): Promise<void>;
    /**
     * Runs before this rules element's parent item is updated */
    preUpdate?(changes: DeepPartial<ItemSourcePF2e>): Promise<void>;
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
     * Run at certain encounter events, such as the start of the actor's turn. Similar to onCreate and onDelete, this provides an opportunity to make
     * updates to the actor.
     * @param data.event        The type of event that triggered this callback
     * @param data.actorUpdates A record containing update data for the actor
     */
    onUpdateEncounter?(data: {
        event: "initiative-roll" | "turn-start";
        actorUpdates: Record<string, unknown>;
    }): Promise<void>;
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
    applyDamageExclusion?(weapon: WeaponPF2e, modifiers: (DamageDicePF2e | ModifierPF2e)[]): void;
}
declare namespace RuleElementPF2e {
    interface PreCreateParams<T extends RuleElementSource = RuleElementSource> {
        /** The source partial of the rule element's parent item to be created */
        itemSource: ItemSourcePF2e;
        /** The source of the rule in `itemSource`'s `system.rules` array */
        ruleSource: T;
        /** All items pending creation in a `ItemPF2e.createDocuments` call */
        pendingItems: ItemSourcePF2e[];
        /** Items temporarily constructed from pending item source */
        tempItems: ItemPF2e<ActorPF2e>[];
        /** The `operation` object from the `ItemPF2e.createDocuments` call */
        operation: Partial<DatabaseCreateOperation<ActorPF2e | null>>;
        /** Whether this preCreate run is from a pre-update reevaluation */
        reevaluation?: boolean;
    }
    interface PreDeleteParams {
        /** All items pending deletion in a `ItemPF2e.deleteDocuments` call */
        pendingItems: ItemPF2e<ActorPF2e>[];
        /** The context object from the `ItemPF2e.deleteDocuments` call */
        operation: Partial<DatabaseDeleteOperation<ActorPF2e | null>>;
    }
    interface AfterRollParams {
        roll: Rolled<CheckRoll>;
        check: CheckModifier;
        context: CheckCheckContext;
        domains: string[];
        rollOptions: Set<string>;
    }
}
interface ResolveValueParams {
    evaluate?: boolean;
    resolvables?: Record<string, unknown>;
    warn?: boolean;
}
interface RuleElementOptions extends ParentedDataModelConstructionOptions<ItemPF2e<ActorPF2e>> {
    /** If created from an item, the index in the source data */
    sourceIndex?: number;
    /** If data validation fails for any reason, do not emit console warnings */
    suppressWarnings?: boolean;
}
export { RuleElementPF2e, type RuleElementOptions };
