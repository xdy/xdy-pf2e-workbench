import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "../index";
import { ActorType } from "@actor/data";
import { CharacterPF2e } from "@actor";
import { ItemPF2e } from "@item";

/**
 * @category RuleElement
 */
declare class CraftingFormulaRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    constructor(data: CraftingFormulaSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface CraftingFormulaRuleElement extends RuleElementPF2e {
    data: CraftingFormulaData;
    get actor(): CharacterPF2e;
}
interface CraftingFormulaData extends RuleElementData {
    uuid: ItemUUID;
}
interface CraftingFormulaSource extends RuleElementSource {
    uuid?: unknown;
}
export { CraftingFormulaRuleElement };
