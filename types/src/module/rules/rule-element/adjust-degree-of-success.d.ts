import { CharacterPF2e, NPCPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { DegreeOfSuccessString } from "@system/degree-of-success";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./";
/**
 * @category RuleElement
 */
declare class AdjustDegreeOfSuccessRuleElement extends RuleElementPF2e {
    #private;
    selector: string;
    constructor(data: AdjustDegreeOfSuccessSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface AdjustDegreeOfSuccessRuleElement {
    data: RuleElementData & {
        adjustment?: DegreeAdjustmentsRuleRecord;
    };
    get actor(): CharacterPF2e | NPCPF2e;
}
type DegreeAdjustmentAmountString = "one-degree-better" | "one-degree-worse" | "two-degrees-better" | "two-degrees-worse";
type DegreeAdjustmentsRuleRecord = {
    [key in "all" | DegreeOfSuccessString]?: DegreeAdjustmentAmountString;
};
interface AdjustDegreeOfSuccessSource extends RuleElementSource {
    selector?: unknown;
}
export { AdjustDegreeOfSuccessRuleElement };
