import { RuleElementPF2e, RuleElementData, RuleElementSource, RuleElementOptions } from "..";
import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RawPredicate } from "@system/predication";
/**
 * @category RuleElement
 */
declare class CraftingEntryRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    name: string;
    selector: string;
    constructor(data: CraftingEntryRuleSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
    /** Set a roll option to cue any subsequent max-item-level-increasing `ActiveEffectLike`s */
    onApplyActiveEffects(): void;
}
interface CraftingEntryRuleElement extends RuleElementPF2e {
    data: CraftingEntryRuleData;
    get actor(): CharacterPF2e;
}
interface CraftingEntryRuleData extends RuleElementData {
    isAlchemical?: boolean;
    isDailyPrep?: boolean;
    isPrepared?: boolean;
    maxItemLevel?: number;
    maxSlots?: number;
    craftableItems?: RawPredicate;
    preparedFormulas?: PreparedFormulaData[];
}
interface CraftingEntryRuleSource extends RuleElementSource {
    name?: unknown;
    isAlchemical?: unknown;
    isDailyPrep?: unknown;
    isPrepared?: unknown;
    maxItemLevel?: unknown;
    maxSlots?: unknown;
    craftableItems?: unknown;
    preparedFormulas?: unknown;
}
interface PreparedFormulaData {
    itemUUID: string;
    quantity?: number;
    expended?: boolean;
    isSignatureItem?: boolean;
}
export { CraftingEntryRuleElement };
