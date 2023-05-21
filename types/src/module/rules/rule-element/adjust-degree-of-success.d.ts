import { ActorPF2e, CharacterPF2e, NPCPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { DegreeOfSuccessString } from "@system/degree-of-success.ts";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * @category RuleElement
 */
declare class AdjustDegreeOfSuccessRuleElement extends RuleElementPF2e {
    #private;
    selector: string;
    constructor(data: AdjustDegreeOfSuccessSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface AdjustDegreeOfSuccessRuleElement extends RuleElementPF2e {
    data: RuleElementData & {
        adjustment?: DegreeAdjustmentsRuleRecord;
    };
    get actor(): CharacterPF2e | NPCPF2e;
}
declare const degreeAdjustmentAmountString: readonly ["one-degree-better", "one-degree-worse", "two-degrees-better", "two-degrees-worse", "to-critical-failure", "to-failure", "to-success", "to-critical-success"];
type DegreeAdjustmentAmountString = (typeof degreeAdjustmentAmountString)[number];
type DegreeAdjustmentsRuleRecord = {
    [key in "all" | DegreeOfSuccessString]?: DegreeAdjustmentAmountString;
};
interface AdjustDegreeOfSuccessSource extends RuleElementSource {
    selector?: unknown;
}
export { AdjustDegreeOfSuccessRuleElement };
