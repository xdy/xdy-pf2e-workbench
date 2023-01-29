import { ActorType } from "@actor/data";
import { ModifierType } from "@actor/modifiers";
import { AbilityString } from "@actor/types";
import { ItemPF2e } from "@item";
import { CriticalInclusion, DamageCategoryUnique } from "@system/damage";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./";
/**
 * Apply a constant modifier (or penalty/bonus) to a statistic or usage thereof
 * @category RuleElement
 */
declare class FlatModifierRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    /** All domains to add a modifier to */
    selectors: string[];
    type: ModifierType;
    /** If this is an ability modifier, the ability score it modifies */
    ability: AbilityString | null;
    /** Whether to use this bonus/penalty/modifier even if it isn't the greatest magnitude */
    force: boolean;
    /** Hide this modifier from breakdown tooltips if it is disabled */
    hideIfDisabled: boolean;
    /** Whether this modifier comes from equipment or an equipment effect */
    fromEquipment: boolean;
    /** If a damage modifier, a damage type */
    damageType: string | null;
    /** If a damage modifier, a special category */
    damageCategory: DamageCategoryUnique | null;
    /** If a damage modifier, whether it applies given the presence or absence of a critically successful attack roll */
    critical: CriticalInclusion;
    constructor(data: FlatModifierSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
type ModifierPhase = "beforeDerived" | "afterDerived" | "beforeRoll";
interface FlatModifierRuleElement {
    data: FlatModifierData;
}
interface FlatModifierData extends RuleElementData {
    min?: number;
    max?: number;
    damageType?: string;
    phase: ModifierPhase;
}
interface FlatModifierSource extends RuleElementSource {
    selector?: unknown;
    min?: unknown;
    max?: unknown;
    type?: unknown;
    ability?: unknown;
    force?: unknown;
    damageType?: unknown;
    damageCategory?: unknown;
    critical?: unknown;
    hideIfDisabled?: unknown;
    fromEquipment?: unknown;
}
export { FlatModifierRuleElement, FlatModifierSource };
