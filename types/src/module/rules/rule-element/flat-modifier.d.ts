import { RuleElementPF2e, RuleElementData, RuleElementSource, RuleElementOptions } from "./";
import { ModifierType } from "@actor/modifiers";
import { AbilityString, ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
/**
 * Apply a constant modifier (or penalty/bonus) to a statistic or usage thereof
 * @category RuleElement
 */
declare class FlatModifierRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    type: ModifierType;
    /** If this is an ability modifier, the ability score it modifies */
    ability: AbilityString | null;
    /** Hide this modifier from breakdown tooltips if it is disabled */
    hideIfDisabled: boolean;
    /** Whether this modifier comes from equipment or an equipment effect */
    fromEquipment: boolean;
    constructor(data: FlatModifierSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
declare type ModifierPhase = "beforeDerived" | "afterDerived" | "beforeRoll";
interface FlatModifierRuleElement {
    data: FlatModifierData;
}
interface FlatModifierData extends RuleElementData {
    min?: number;
    max?: number;
    damageType?: string;
    damageCategory?: string;
    phase: ModifierPhase;
}
interface FlatModifierSource extends RuleElementSource {
    min?: unknown;
    max?: unknown;
    type?: unknown;
    ability?: unknown;
    damageType?: unknown;
    damageCategory?: unknown;
    hideIfDisabled?: unknown;
    fromEquipment?: unknown;
}
export { FlatModifierRuleElement };
