import { AbilityString } from "@actor/types";
import { RollNotePF2e } from "@module/notes";
import { DamageDieSize, DamageType } from "@system/damage";
import { DegreeOfSuccessAdjustment } from "@system/degree-of-success";
import { PredicatePF2e, RawPredicate } from "@system/predication";
declare const PROFICIENCY_RANK_OPTION: readonly ["proficiency:untrained", "proficiency:trained", "proficiency:expert", "proficiency:master", "proficiency:legendary"];
declare function ensureProficiencyOption(options: string[], rank: number): void;
/**
 * The canonical pathfinder modifier types; modifiers of the same type do not stack (except for 'untyped' modifiers,
 * which fully stack).
 */
declare const MODIFIER_TYPE: {
    readonly ABILITY: "ability";
    readonly PROFICIENCY: "proficiency";
    readonly CIRCUMSTANCE: "circumstance";
    readonly ITEM: "item";
    readonly POTENCY: "potency";
    readonly STATUS: "status";
    readonly UNTYPED: "untyped";
};
declare const MODIFIER_TYPES: Set<"item" | "status" | "untyped" | "ability" | "circumstance" | "potency" | "proficiency">;
declare type ModifierType = SetElement<typeof MODIFIER_TYPES>;
interface BaseRawModifier {
    /** An identifier for this modifier; should generally be a localization key (see en.json). */
    slug?: string;
    /** The display name of this modifier; can be a localization key (see en.json). */
    label: string;
    /** The actual numeric benefit/penalty that this modifier provides. */
    modifier?: number;
    /** The type of this modifier - modifiers of the same type do not stack (except for `untyped` modifiers). */
    type?: string;
    /** If the type is "ability", this should be set to a particular ability */
    ability?: AbilityString | null;
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
    damageType?: string | null;
    /** The damage category */
    damageCategory?: string | null;
    /** A predicate which determines when this modifier is active. */
    predicate?: RawPredicate;
    /** If true, this modifier is only active on a critical hit. */
    critical?: boolean | null;
    /** Any notes about this modifier. */
    notes?: string;
    /** The list of traits that this modifier gives to the underlying attack, if any. */
    traits?: string[];
    /** Hide this modifier in UIs if it is disabled */
    hideIfDisabled?: boolean;
}
interface ModifierAdjustment {
    /** A slug for matching against modifiers: `null` will match against all modifiers within a selector */
    slug: string | null;
    predicate: PredicatePF2e;
    damageType?: DamageType;
    relabel?: string;
    suppress: boolean;
    getNewValue?: (current: number) => number;
    getDamageType?: (current: DamageType | null) => DamageType | null;
}
interface RawModifier extends BaseRawModifier {
    modifier: number;
}
interface DeferredValueParams {
    /** An object to merge into roll data for `Roll.replaceFormulaData` */
    resolvables?: Record<string, unknown>;
    /** An object to merge into standard options for `RuleElementPF2e#resolveInjectedProperties` */
    injectables?: Record<string, unknown>;
    /** Roll Options to get against a predicate (if available) */
    test?: string[];
}
declare type DeferredValue<T> = (options?: DeferredValueParams) => T;
/** Represents a discrete modifier, bonus, or penalty, to a statistic or check. */
declare class ModifierPF2e implements RawModifier {
    #private;
    slug: string;
    label: string;
    /** The value of the modifier */
    modifier: number;
    type: ModifierType;
    ability: AbilityString | null;
    adjustments: ModifierAdjustment[];
    enabled: boolean;
    ignored: boolean;
    source: string | null;
    custom: boolean;
    damageType: DamageType | null;
    damageCategory: string | null;
    predicate: PredicatePF2e;
    critical: boolean | null;
    traits: string[];
    notes: string;
    hideIfDisabled: boolean;
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
    /** Return a copy of this ModifierPF2e instance */
    clone(options?: {
        test?: string[];
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
declare type ModifierObjectParams = RawModifier & {
    name?: string;
};
declare type ModifierOrderedParams = [
    slug: string,
    modifier: number,
    type?: string,
    enabled?: boolean,
    ignored?: boolean,
    source?: string,
    notes?: string
];
declare const AbilityModifier: {
    /**
     * Create a modifier from a given ability type and score.
     * @param ability str = Strength, dex = Dexterity, con = Constitution, int = Intelligence, wis = Wisdom, cha = Charisma
     * @param score The score of this ability.
     * @returns The modifier provided by the given ability score.
     */
    fromScore: (ability: AbilityString, score: number) => ModifierPF2e;
};
declare const UNTRAINED: {
    atLevel: (_level: number) => ModifierPF2e;
};
declare const TRAINED: {
    atLevel: (level: number) => ModifierPF2e;
};
declare const EXPERT: {
    atLevel: (level: number) => ModifierPF2e;
};
declare const MASTER: {
    atLevel: (level: number) => ModifierPF2e;
};
declare const LEGENDARY: {
    atLevel: (level: number) => ModifierPF2e;
};
declare const ProficiencyModifier: {
    /**
     * Create a modifier for a given proficiency level of some ability.
     * @param level The level of the character which this modifier is being applied to.
     * @param rank 0 = untrained, 1 = trained, 2 = expert, 3 = master, 4 = legendary
     * @returns The modifier for the given proficiency rank and character level.
     */
    fromLevelAndRank: (level: number, rank: number) => ModifierPF2e;
};
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
    /** The name of this collection of modifiers for a statistic. */
    name: string;
    /** The list of modifiers which affect the statistic. */
    protected _modifiers: ModifierPF2e[];
    /** The total modifier for the statistic, after applying stacking rules. */
    totalModifier: number;
    /** A textual breakdown of the modifiers factoring into this statistic */
    breakdown: string;
    /** Optional notes, which are often added to statistic modifiers */
    notes?: RollNotePF2e[];
    adjustments?: DegreeOfSuccessAdjustment[];
    /** Allow decorating this object with any needed extra fields. <-- ಠ_ಠ */
    [key: string]: any;
    /**
     * @param name The name of this collection of statistic modifiers.
     * @param modifiers All relevant modifiers for this statistic.
     * @param rollOptions Roll options used for initial total calculation
     */
    constructor(name: string, modifiers?: ModifierPF2e[], rollOptions?: string[]);
    /** Get the list of all modifiers in this collection (as a read-only list). */
    get modifiers(): readonly ModifierPF2e[];
    /** Add a modifier to the end of this collection. */
    push(modifier: ModifierPF2e): number;
    /** Add a modifier to the beginning of this collection. */
    unshift(modifier: ModifierPF2e): number;
    /** Delete a modifier from this collection by name or reference */
    delete(modifierName: string | ModifierPF2e): boolean;
    /** Obtain the total modifier, optionally retesting predicates, and finally applying stacking rules. */
    calculateTotal(rollOptions?: string[]): void;
    private applyAdjustments;
}
/**
 * Represents the list of modifiers for a specific check.
 * @category PF2
 */
declare class CheckModifier extends StatisticModifier {
    /**
     * @param name The name of this check modifier.
     * @param statistic The statistic modifier to copy fields from.
     * @param modifiers Additional modifiers to add to this check.
     */
    constructor(name: string, statistic: StatisticModifier, modifiers?: ModifierPF2e[]);
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
}
/**
 * Represents extra damage dice for one or more weapons or attack actions.
 * @category PF2
 */
declare class DiceModifierPF2e implements BaseRawModifier {
    slug: string;
    /**
     * Formerly both a slug and label; should prefer separately set slugs and labels
     * @deprecated
     */
    name?: string;
    label: string;
    /** The number of dice to add. */
    diceNumber: number;
    /** The size of the dice to add. */
    dieSize?: DamageDieSize;
    /**
     * True means the dice are added to critical without doubling; false means the dice are never added to critical
     * damage; omitted means add to normal damage and double on critical damage.
     */
    critical?: boolean;
    /** The damage category of these dice. */
    category?: string;
    damageType?: string | null;
    /** If true, these dice overide the base damage dice of the weapon. */
    override?: DamageDiceOverride;
    ignored: boolean;
    enabled: boolean;
    custom: boolean;
    predicate: PredicatePF2e;
    constructor(param: Partial<Omit<DiceModifierPF2e, "predicate">> & {
        slug?: string;
        predicate?: RawPredicate;
    });
}
declare type PartialParameters = Partial<Omit<DamageDicePF2e, "predicate">> & Pick<DamageDicePF2e, "selector" | "slug">;
interface DamageDiceParameters extends PartialParameters {
    predicate?: RawPredicate;
}
declare class DamageDicePF2e extends DiceModifierPF2e {
    /** The selector used to determine when *has a stroke*  */
    selector: string;
    constructor(params: DamageDiceParameters);
    clone(): DamageDicePF2e;
}
export { AbilityModifier, BaseRawModifier, CheckModifier, DamageDiceOverride, DamageDicePF2e, DeferredValue, DeferredValueParams, DiceModifierPF2e, EXPERT, LEGENDARY, MASTER, MODIFIER_TYPE, MODIFIER_TYPES, ModifierAdjustment, ModifierPF2e, ModifierType, PROFICIENCY_RANK_OPTION, ProficiencyModifier, RawModifier, StatisticModifier, TRAINED, UNTRAINED, applyStackingRules, ensureProficiencyOption, };
