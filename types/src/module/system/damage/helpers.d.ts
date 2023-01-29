import { DamageInstance, DamageRoll } from "./roll";
import { ArithmeticExpression, Grouping } from "./terms";
import { DamageCategory, DamageDieSize } from "./types";
declare function nextDamageDieSize(next: {
    upgrade: DamageDieSize;
}): DamageDieSize;
declare function nextDamageDieSize(next: {
    downgrade: DamageDieSize;
}): DamageDieSize;
/** Provides constants for typical damage categories, as well as a simple API for adding custom damage types and categories. */
declare const DamageCategorization: {
    /**
     * Map a damage type to it's corresponding damage category. If the type has no category, the type itself will be
     * returned.
     */
    readonly fromDamageType: (damageType: string) => DamageCategory | null;
    /** Get a set of all damage categories (both base and custom). */
    readonly allCategories: () => Set<"persistent" | "abysium" | "adamantine" | "cold-iron" | "djezet" | "mithral" | "noqual" | "peachwood" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "sovereign-steel" | "warpglass" | "precision" | "splash" | "energy" | "physical" | "alignment">;
    /** Get a set of all of the base rule damage types. */
    readonly baseCategories: () => Set<"persistent" | "abysium" | "adamantine" | "cold-iron" | "djezet" | "mithral" | "noqual" | "peachwood" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "sovereign-steel" | "warpglass" | "precision" | "splash" | "energy" | "physical" | "alignment">;
    /** Map a damage category to the set of damage types in it. */
    readonly toDamageTypes: (category: string) => Set<string>;
};
/** Create a span element for displaying splash damage */
declare function renderComponentDamage(term: RollTerm): HTMLElement;
declare function isSystemDamageTerm(term: RollTerm): term is ArithmeticExpression | Grouping;
declare function deepFindTerms(term: RollTerm, { flavor }: {
    flavor: string;
}): RollTerm[];
/** A check for whether a string is a well-formed damage formula and most likely intended to be one */
declare function looksLikeDamageFormula(formula: string): boolean;
/** Create a representative Font Awesome icon from a damage roll */
declare function damageDiceIcon(roll: DamageRoll | DamageInstance, { fixedWidth }?: {
    fixedWidth?: boolean | undefined;
}): HTMLElement;
/** Indicate in a term's options that it was multiplied by 2 or 3 */
declare function markAsCrit(term: RollTerm, multiplier: 2 | 3): void;
export { DamageCategorization, damageDiceIcon, deepFindTerms, isSystemDamageTerm, looksLikeDamageFormula, markAsCrit, nextDamageDieSize, renderComponentDamage, };
