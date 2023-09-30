import { RuleElementSource } from "@module/rules/index.ts";
import { MultipleAttackPenaltyRuleElement } from "@module/rules/rule-element/multiple-attack-penalty.ts";
import { RuleElementForm } from "./base.ts";
declare class MultipleAttackPenaltyForm extends RuleElementForm<RuleElementSource, MultipleAttackPenaltyRuleElement> {
    template: string;
}
export { MultipleAttackPenaltyForm };
