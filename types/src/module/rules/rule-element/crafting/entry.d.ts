import { RuleElementPF2e, RuleElementData, RuleElementSource, RuleElementOptions } from "../index.ts";
import { ActorPF2e, CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ItemPF2e } from "@item";
import { RawPredicate } from "@system/predication.ts";
/**
 * @category RuleElement
 */
declare class CraftingEntryRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    private selector;
    constructor(data: CraftingEntryRuleSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
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
    selector?: unknown;
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
export { CraftingEntryRuleData, CraftingEntryRuleElement, CraftingEntryRuleSource };
