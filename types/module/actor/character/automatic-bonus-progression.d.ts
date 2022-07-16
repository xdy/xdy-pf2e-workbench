import { WeaponPF2e } from "@item";
import { RuleElementSynthetics, WeaponPotencyPF2e } from "@module/rules/rule-element";
import { FlatModifierRuleElement } from "@module/rules/rule-element/flat-modifier";
export declare class AutomaticBonusProgression {
    static get isEnabled(): boolean;
    /**
     * @param level The name of this collection of statistic modifiers.
     * @param synthetics All relevant modifiers for this statistic.
     */
    static concatModifiers(level: number, synthetics: RuleElementSynthetics): void;
    /** Remove stored runes from specific magic weapons or otherwise set prior to enabling ABP */
    static cleanupRunes(weapon: WeaponPF2e): void;
    static applyPropertyRunes(potency: WeaponPotencyPF2e[], weapon: Embedded<WeaponPF2e>): void;
    /**
     * Determine whether a rule element can be applied to an actor.
     * @param rule The rule element to assess
     * @returns Whether the rule element is to be ignored
     */
    static suppressRuleElement(rule: FlatModifierRuleElement, value: number): boolean;
    private static abpValues;
}
