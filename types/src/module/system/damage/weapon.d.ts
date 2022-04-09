import { StrikeTrait } from "@actor/data/base";
import { WeaponData } from "@item/data";
import { DamageDicePF2e, DiceModifierPF2e, ModifierPF2e } from "@actor/modifiers";
import { RollNotePF2e } from "@module/notes";
import { StrikingPF2e, WeaponPotencyPF2e } from "@module/rules/rule-element";
import { DamageDieSize, DamageType } from ".";
import { CharacterPF2e, NPCPF2e } from "@actor";
import { DeferredModifier } from "@module/rules/rule-element/data";
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
        dieSize: DamageDieSize;
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
}
/** A pool of damage dice & modifiers, grouped by damage type. */
export declare type DamagePool = Record<string, {
    /** If true, this is the 'base' damage of the weapon or attack; some abilities scale off of base damage dice. */
    base?: boolean;
    categories: {
        [category: string]: {
            /** The static amount of damage of the current damage type and category. */
            modifier?: number;
            /** Maps the die face ('d4', 'd6', 'd8', 'd10', 'd12') to the number of dice of that type. */
            dice?: Record<string, number>;
        };
    };
}>;
/**
 * @category PF2
 */
export declare class WeaponDamagePF2e {
    static calculateStrikeNPC(weapon: any, actor: NPCPF2e, traits: StrikeTrait[] | undefined, statisticsModifiers: Record<string, DeferredModifier[]>, damageDice: Record<string, DamageDicePF2e[]>, proficiencyRank: number | undefined, options: string[] | undefined, rollNotes: Record<string, RollNotePF2e[]>): DamageTemplate;
    static calculate(weapon: WeaponData, actor: CharacterPF2e | NPCPF2e, traits: StrikeTrait[] | undefined, statisticsModifiers: Record<string, DeferredModifier[]>, damageDice: Record<string, DamageDicePF2e[]>, proficiencyRank: number | undefined, options: string[] | undefined, rollNotes: Record<string, RollNotePF2e[]>, weaponPotency: WeaponPotencyPF2e | null, striking: Record<string, StrikingPF2e[]>): DamageTemplate;
    /** Convert the damage definition into a final formula, depending on whether the hit is a critical or not. */
    static getFormula(damage: Omit<DamageTemplate, "formula">, critical: boolean): DamageFormula;
    /** Add dice to the given damage pool. */
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
    /** Determine whether a strike's damage includes the actor's strength modifier */
    static strengthModToDamage(weaponData: WeaponData): boolean;
}
