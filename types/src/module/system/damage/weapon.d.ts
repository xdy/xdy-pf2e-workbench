import { CharacterPF2e, NPCPF2e } from "@actor";
import { TraitViewData } from "@actor/data/base";
import { DamageDicePF2e, DiceModifierPF2e, ModifierAdjustment, ModifierPF2e } from "@actor/modifiers";
import { MeleePF2e, WeaponPF2e } from "@item";
import { MeleeDamageRoll } from "@item/melee/data";
import { WeaponDamage } from "@item/weapon/data";
import { WeaponMaterialEffect } from "@item/weapon/types";
import { RollNotePF2e } from "@module/notes";
import { DeferredModifier, PotencySynthetic, StrikeAdjustment, StrikingSynthetic } from "@module/rules/synthetics";
import { DamageDieSize, DamageType } from ".";
declare class WeaponDamagePF2e {
    static calculateStrikeNPC(attack: MeleePF2e, actor: NPCPF2e, traits: TraitViewData[] | undefined, statisticsModifiers: Record<string, DeferredModifier[]>, modifierAdjustments: Record<string, ModifierAdjustment[]>, damageDice: Record<string, DamageDicePF2e[]>, proficiencyRank: number | undefined, options: string[] | undefined, rollNotes: Record<string, RollNotePF2e[]>, strikeAdjustments: StrikeAdjustment[]): DamageTemplate | null;
    static calculate(weapon: WeaponPF2e | MeleePF2e, actor: CharacterPF2e | NPCPF2e, traits: TraitViewData[] | undefined, statisticsModifiers: Record<string, DeferredModifier[]>, modifierAdjustments: Record<string, ModifierAdjustment[]>, damageDice: Record<string, DamageDicePF2e[]>, proficiencyRank: number | undefined, options: string[] | undefined, rollNotes: Record<string, RollNotePF2e[]>, weaponPotency: PotencySynthetic | null, striking: Record<string, StrikingSynthetic[]>, strikeAdjustments: StrikeAdjustment[]): DamageTemplate | null;
    /** Convert the damage definition into a final formula, depending on whether the hit is a critical or not. */
    static getFormula(damage: Omit<DamageTemplate, "formula">, critical: boolean): DamageFormula;
    /** Add dice to the given damage pool */
    static addDice(pool: DamagePool, damageType: string, category: string | undefined, dieSize: string, count: number): DamagePool;
    /** Converts a damage pool to a final string formula. */
    static buildFormula(pool: DamagePool, partials?: {
        [damageType: string]: {
            [damageCategory: string]: string;
        };
    }): string;
    /**
     * Retrieve exclusion terms from rule elements. Any term is not in the `any` or `all` predicate,
     * it is added to the `not` predicate
     */
    private static excludeDamage;
    /** Double a textual formula based on the current crit rules. */
    static doubleFormula(formula: string): string;
    private static getSelectors;
    /** Parse damage formulas from melee items and construct `WeaponDamage` objects out of them */
    static npcDamageToWeaponDamage(instance: MeleeDamageRoll): WeaponDamage;
    /** Determine whether a strike's damage includes the actor's strength modifier */
    static strengthModToDamage(weapon: WeaponPF2e | MeleePF2e): boolean;
}
export interface DamagePartials {
    [damageType: string]: {
        [damageCategory: string]: string;
    };
}
export interface DamageFormula {
    data: {
        baseDamageType: DamageType;
        effectiveDamageDice: number;
    };
    formula: string;
    partials: DamagePartials;
}
export interface DamageTemplate {
    base: {
        damageType: DamageType;
        diceNumber: number;
        dieSize: DamageDieSize | null;
        category: string;
        modifier: number;
    };
    diceModifiers: DiceModifierPF2e[];
    effectDice: number;
    formula: {
        criticalFailure?: DamageFormula;
        failure?: DamageFormula;
        success: DamageFormula;
        criticalSuccess: DamageFormula;
    };
    name: string;
    notes: RollNotePF2e[];
    numericModifiers: ModifierPF2e[];
    traits: string[];
    materials: WeaponMaterialEffect[];
}
/** A pool of damage dice & modifiers, grouped by damage type. */
export declare type DamagePool = Record<string, {
    /** If true, this is the 'base' damage of the weapon or attack; some abilities scale off of base damage dice. */
    base?: boolean;
    categories: {
        [category: string]: {
            /** The static amount of damage of the current damage type and category. */
            modifier: number;
            /** Maps the die face ("d4", "d6", "d8", "d10", "d12") to the number of dice of that type. */
            dice: Record<string, number>;
        };
    };
}>;
export { WeaponDamagePF2e };
