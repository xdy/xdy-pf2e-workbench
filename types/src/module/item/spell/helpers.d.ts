import { DamageDicePF2e, ModifierPF2e } from "@actor/modifiers";
import { DamageType } from "@system/damage";
/** Contains the formula and all modifiers that apply to the instance */
interface DamageInstancePartial {
    formula: string;
    damageType: DamageType;
    damageCategory: string | null;
    /** Additional damage tags such as silver or orichalcum */
    tags: Set<string>;
    /** Tracks which modifiers added to this instance */
    modifiers: ModifierPF2e[];
    dice: DamageDicePF2e[];
}
/** Apply damage dice to a spell's damage formulas */
declare function applyDamageDiceOverrides(formulas: DamageInstancePartial[], dice: DamageDicePF2e[]): void;
interface FormulaAndTags {
    formula: string;
    breakdownTags: string[];
}
/** Creates the formula and the breakdown tags for the instance partial data */
declare function createFormulaAndTagsForPartial(data: DamageInstancePartial, typeLabel?: string | null): FormulaAndTags;
export { DamageInstancePartial, applyDamageDiceOverrides, createFormulaAndTagsForPartial };
