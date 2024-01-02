import type { ActorType, CharacterPF2e } from "@actor";
import { RuleElementOptions, RuleElementPF2e } from "../base.ts";
import { RuleElementSource } from "../data.ts";
/**
 * @category RuleElement
 */
declare class CraftingFormulaRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    constructor(data: CraftingFormulaSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface CraftingFormulaRuleElement extends RuleElementPF2e {
    data: CraftingFormulaData;
    get actor(): CharacterPF2e;
}
interface CraftingFormulaData extends CraftingFormulaRuleElement {
    uuid: ItemUUID;
}
interface CraftingFormulaSource extends RuleElementSource {
    uuid?: unknown;
}
export { CraftingFormulaRuleElement };
