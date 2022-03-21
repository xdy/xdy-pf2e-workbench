import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index";
import { ModifierType } from "@actor/modifiers";
import { AbilityString, ActorType } from "@actor/data";
import { ItemPF2e } from "@item";

/**
 * Apply a constant modifier (or penalty/bonus) to a statistic or usage thereof
 * @category RuleElement
 */
declare class FlatModifierRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    constructor(data: FlatModifierSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
declare type ModifierPhase = "beforeDerived" | "afterDerived" | "beforeRoll";
interface FlatModifierRuleElement {
    data: FlatModifierData;
}
interface FlatModifierSource extends RuleElementSource {
    min?: unknown;
    max?: unknown;
    type?: unknown;
    ability?: unknown;
    damageType?: unknown;
    damageCategory?: unknown;
    hideIfDisabled?: unknown;
}
declare type FlatModifierData = FlatAbilityModifierData | FlatOtherModifierData;
interface BaseFlatModifierData extends RuleElementData {
    slug?: string;
    min?: number;
    max?: number;
    type: ModifierType;
    damageType?: string;
    damageCategory?: string;
    hideIfDisabled: boolean;
    phase: ModifierPhase;
}
interface FlatAbilityModifierData extends BaseFlatModifierData {
    type: "ability";
    ability: AbilityString;
}
interface FlatOtherModifierData extends Exclude<BaseFlatModifierData, "type"> {
    type: Exclude<ModifierType, "ability">;
}
export { FlatModifierRuleElement };
