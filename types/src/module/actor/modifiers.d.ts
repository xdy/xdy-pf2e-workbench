import type { ActorPF2e, CharacterPF2e, NPCPF2e } from "@actor";
import type { AttributeString } from "@actor/types.ts";
import type { ItemPF2e } from "@item";
import { ZeroToFour } from "@module/data.ts";
import type { RollNotePF2e } from "@module/notes.ts";
import type { RuleElementPF2e } from "@module/rules/index.ts";
import { DamageAlteration } from "@module/rules/rule-element/damage-alteration/alteration.ts";
import type { DamageCategoryUnique, DamageDiceFaces, DamageDieSize, DamageType } from "@system/damage/types.ts";
import { Predicate, RawPredicate } from "@system/predication.ts";

declare const PROFICIENCY_RANK_OPTION: readonly ["proficiency:untrained", "proficiency:trained", "proficiency:expert", "proficiency:master", "proficiency:legendary"];
declare function ensureProficiencyOption(options: Set<string>, rank: number): void;
declare const MODIFIER_TYPES: Set<"untyped" | "item" | "ability" | "circumstance" | "potency" | "proficiency" | "status">;
type ModifierType = SetElement<typeof MODIFIER_TYPES>;
interface RawModifier {
    /** An identifier for this modifier; should generally be a localization key (see en.json). */
    slug?: string;
    /** The domains of discourse to which this modifier belongs */
    domains?: string[];
    /** The display name of this modifier; can be a localization key (see en.json). */
    label: string;
    /** The actual numeric benefit/penalty that this modifier provides. */
    modifier: number;
    /** The type of this modifier - modifiers of the same type do not stack (except for `untyped` modifiers). */
    type?: ModifierType;
    /** If the type is "ability", this should be set to a particular ability */
    ability?: AttributeString | null;
    /** Numeric adjustments to apply */
    adjustments?: ModifierAdjustment[];
    /** If true, this modifier will be applied to the final roll; if false, it will be ignored. */
    enabled?: boolean;
    /** If true, these custom dice are being ignored in the damage calculation. */
    ignored?: boolean;
    /** The source from which this modifier originates, if any. */
    source?: string | null;
    /** If true, this modifier is a custom player-provided modifier. */
    custom?: boolean;
    /** The damage type that this modifier does, if it modifies a damage roll. */
    damageType?: DamageType | null;
    /** The damage category */
    damageCategory?: DamageCategoryUnique | null;
    /** A predicate that determines when this modifier is active */
    predicate?: RawPredicate;
    /** If true, this modifier is only active on a critical hit. */
    critical?: boolean | null;
    /** A list of tags associated with this modifier */
    tags?: string[];
    /** Hide this modifier in UIs if it is disabled */
    hideIfDisabled?: boolean;
    /** Whether to use this bonus/penalty/modifier even if it isn't the greatest magnitude */
    force?: boolean;
}
interface ModifierAdjustment {
    /** A slug for matching against modifiers: `null` will match against all modifiers within a selector */
    slug: string | null;
    test: (options: string[] | Set<string>) => boolean;
    damageType?: DamageType;
    relabel?: string;
    suppress?: boolean;
    getNewValue?: (current: number) => number;
    getDamageType?: (current: DamageType | null) => DamageType | null;
}
interface DeferredValueParams {
    /** An object to merge into roll data for `Roll.replaceFormulaData` */
    resolvables?: Record<string, unknown>;
    /** An object to merge into standard options for `RuleElementPF2e#resolveInjectedProperties` */
    injectables?: Record<string, unknown>;
    /** Roll Options to get against a predicate (if available) */
    test?: string[] | Set<string>;
}
interface TestableDeferredValueParams extends DeferredValueParams {
    test: string[] | Set<string>;
}
interface DeferredDamageDiceOptions extends TestableDeferredValueParams {
    selectors: string[];
}
type DeferredValue<T> = (options?: DeferredValueParams) => T | null;
type DeferredPromise<T> = (options?: DeferredValueParams) => Promise<T | null>;
/** Represents a discrete modifier, bonus, or penalty, to a statistic or check. */
declare class ModifierPF2e implements RawModifier {
    #private;
    slug: string;
    label: string;
    domains: string[];
    /** The value of the modifier */
    modifier: number;
    type: ModifierType;
    ability: AttributeString | null;
    adjustments: ModifierAdjustment[];
    alterations: DamageAlteration[];
    force: boolean;
    enabled: boolean;
    ignored: boolean;
    /** The originating rule element of this modifier, if any: used to retrieve "parent" item roll options */
    rule: RuleElementPF2e | null;
    source: string | null;
    custom: boolean;
    damageType: DamageType | null;
    damageCategory: DamageCategoryUnique | null;
    predicate: Predicate;
    critical: boolean | null;
    tags: string[];
    hideIfDisabled: boolean;
    /**
     * The "category" of modifier (a misnomer since bonuses and penalties aren't modifiers):
     * Recorded before adjustments in case of adjustment to zero
     */
    kind: "bonus" | "penalty" | "modifier";
    /**
     * Create a new modifier.
     * Legacy parameters:
     * @param name The name for the modifier; should generally be a localization key.
     * @param modifier The actual numeric benefit/penalty that this modifier provides.
     * @param type The type of the modifier - modifiers of the same type do not stack (except for `untyped` modifiers).
     * @param enabled If true, this modifier will be applied to the result; otherwise, it will not.
     * @param source The source from which this modifier originates, if any.
     * @param notes Any notes about this modifier.
     */
    constructor(args: ModifierObjectParams);
    constructor(...args: ModifierOrderedParams);
    get category(): this["damageCategory"];
    get value(): number;
    get signedValue(): string;
    /**
     * Apply damage alterations: must be called externally by client code that knows this is a damage modifier.
     * @param options.item An item (typically a weapon or spell) producing damage as part of an action
     * @param options.test An `Array` or `Set` of roll options for use in predication testing
     */
    applyDamageAlterations(options: {
        item: ItemPF2e<ActorPF2e>;
        test: string[] | Set<string>;
    }): void;
    /** Return a copy of this ModifierPF2e instance */
    clone(data?: Partial<ModifierObjectParams>, options?: {
        test?: Set<string> | string[] | null;
    }): ModifierPF2e;
    /**
     * Get roll options for this modifier. The current data structure makes for occasional inability to distinguish
     * bonuses and penalties.
     */
    getRollOptions(): string[];
    /** Sets the ignored property after testing the predicate */
    test(options: string[] | Set<string>): void;
    toObject(): Required<RawModifier>;
    toString(): string;
}
interface ModifierObjectParams extends RawModifier {
    name?: string;
    rule?: RuleElementPF2e | null;
    alterations?: DamageAlteration[];
}
type ModifierOrderedParams = [
    slug: string,
    modifier: number,
    type?: ModifierType,
    enabled?: boolean,
    ignored?: boolean,
    source?: string,
    notes?: string
];
/**
 * Create a modifier for a given attribute type.
 * @returns The modifier of the given attribute
 */
declare function createAttributeModifier({ actor, attribute, domains, max }: CreateAbilityModifierParams): ModifierPF2e;
interface CreateAbilityModifierParams {
    actor: CharacterPF2e | NPCPF2e;
    attribute: AttributeString;
    domains: string[];
    /** An optional maximum for this ability modifier */
    max?: number;
}
/**
 * Create a modifier for a given proficiency level of some ability.
 * @returns The modifier for the given proficiency rank and character level.
 */
declare function createProficiencyModifier({ actor, rank, domains, level, addLevel, }: CreateProficiencyModifierParams): ModifierPF2e;
interface CreateProficiencyModifierParams {
    actor: ActorPF2e;
    rank: ZeroToFour;
    domains: string[];
    /** If given, use this value instead of actor.level */
    level?: number;
    addLevel?: boolean;
}
/**
 * Applies the modifier stacking rules and calculates the total modifier. This will mutate the
 * provided modifiers, setting the 'enabled' field based on whether or not the modifiers are active.
 *
 * @param modifiers The list of modifiers to apply stacking rules for.
 * @returns The total modifier provided by the given list of modifiers.
 */
declare function applyStackingRules(modifiers: ModifierPF2e[]): number;
/**
 * Represents a statistic on an actor and its commonly applied modifiers. Each statistic or check can have multiple
 * modifiers, even of the same type, but the stacking rules are applied to ensure that only a single bonus and penalty
 * of each type is applied to the total modifier.
 */
declare class StatisticModifier {
    /** The slug of this collection of modifiers for a statistic. */
    slug: string;
    /** The display label of this statistic */
    label?: string;
    /** The list of modifiers which affect the statistic. */
    protected _modifiers: ModifierPF2e[];
    /** The total modifier for the statistic, after applying stacking rules. */
    totalModifier: number;
    /** A textual breakdown of the modifiers factoring into this statistic */
    breakdown: string;
    /** Optional notes, which are often added to statistic modifiers */
    notes?: RollNotePF2e[];
    /** Roll-option domains associated with this statistic */
    domains?: string[];
    /**
     * @param slug The name of this collection of statistic modifiers.
     * @param modifiers All relevant modifiers for this statistic.
     * @param rollOptions Roll options used for initial total calculation
     */
    constructor(slug: string, modifiers?: ModifierPF2e[], rollOptions?: string[] | Set<string>);
    /** Get the list of all modifiers in this collection */
    get modifiers(): ModifierPF2e[];
    /** Add a modifier to the end of this collection. */
    push(modifier: ModifierPF2e): number;
    /** Add a modifier to the beginning of this collection. */
    unshift(modifier: ModifierPF2e): number;
    /** Delete a modifier from this collection by name or reference */
    delete(modifierSlug: string | ModifierPF2e): boolean;
    /** Obtain the total modifier, optionally retesting predicates, and finally applying stacking rules. */
    calculateTotal(rollOptions?: Set<string>): void;
}
declare function adjustModifiers(modifiers: ModifierPF2e[], rollOptions: Set<string>): void;
/**
 * Represents the list of modifiers for a specific check.
 * @category PF2
 */
declare class CheckModifier extends StatisticModifier {
    /**
     * @param slug The unique slug of this check modifier
     * @param statistic The statistic modifier to copy fields from
     * @param modifiers Additional modifiers to add to this check
     */
    constructor(slug: string, statistic: {
        modifiers: readonly ModifierPF2e[];
    }, modifiers?: ModifierPF2e[], rollOptions?: string[] | Set<string>);
}
interface DamageDiceOverride {
    /** Upgrade the damage dice to the next higher size (maximum d12) */
    upgrade?: boolean;
    /** Downgrade the damage dice to the next lower size (minimum d4) */
    downgrade?: boolean;
    /** Override with a set dice size */
    dieSize?: DamageDieSize;
    /** Override the damage type */
    damageType?: DamageType;
    /** Override the number of damage dice */
    diceNumber?: number;
}
type PartialParameters = Partial<Omit<DamageDicePF2e, "predicate">> & Pick<DamageDicePF2e, "selector" | "slug">;
interface DamageDiceParameters extends PartialParameters {
    predicate?: RawPredicate;
}
declare class DamageDicePF2e {
    /** A selector of an actor's associated damaging statistic  */
    selector: string;
    slug: string;
    label: string;
    /** The number of dice to add. */
    diceNumber: number;
    /** The size of the dice to add. */
    dieSize: DamageDieSize | null;
    /**
     * True means the dice are added to critical without doubling; false means the dice are never added to critical
     * damage; omitted means add to normal damage and double on critical damage.
     */
    critical: boolean | null;
    /** The damage category of these dice. */
    category: "persistent" | "precision" | "splash" | null;
    damageType: DamageType | null;
    /** A list of tags associated with this damage */
    tags: string[];
    /** If true, these dice overide the base damage dice of the weapon. */
    override: DamageDiceOverride | null;
    ignored: boolean;
    enabled: boolean;
    predicate: Predicate;
    alterations: DamageAlteration[];
    hideIfDisabled: boolean;
    constructor(params: DamageDiceParameters);
    /** The `dieSize` as a number (or null) */
    get faces(): DamageDiceFaces | null;
    /** Test the `predicate` against a set of roll options */
    test(options: Set<string>): void;
    /** Get roll options for set of dice using a "dice:" prefix. */
    getRollOptions(): string[];
    /**
     * Apply damage alterations: must be called externally by client code that knows this is a damage modifier.
     * @param options.item An item (typically a weapon or spell) producing damage as part of an action
     * @param options.test An `Array` or `Set` of roll options for use in predication testing
     */
    applyAlterations(options: {
        item: ItemPF2e<ActorPF2e>;
        test: string[] | Set<string>;
    }): void;
    clone(): DamageDicePF2e;
    toObject(): RawDamageDice;
}
interface RawDamageDice extends Required<DamageDiceParameters> {
}
export { CheckModifier, DamageDicePF2e, MODIFIER_TYPES, ModifierPF2e, PROFICIENCY_RANK_OPTION, StatisticModifier, adjustModifiers, applyStackingRules, createAttributeModifier, createProficiencyModifier, ensureProficiencyOption, };
export type { DamageDiceOverride, DamageDiceParameters, DeferredDamageDiceOptions, DeferredPromise, DeferredValue, DeferredValueParams, ModifierAdjustment, ModifierObjectParams, ModifierType, RawDamageDice, RawModifier, TestableDeferredValueParams, };
