import { RuleElementPF2e, RuleElementData } from "./";
import { CharacterPF2e, NPCPF2e } from "@actor";
import { SkillAbbreviation } from "@actor/creature/data";
import { CheckDCModifiers } from "@system/degree-of-success";
/**
 * @category RuleElement
 */
declare class AdjustDegreeOfSuccessRuleElement extends RuleElementPF2e {
    afterPrepareData(): void;
    skillAbbreviationFromString(skill: string): SkillAbbreviation | undefined;
    isAdjustmentData(adjustment: CheckDCModifiers): boolean;
}
interface AdjustDegreeOfSuccessRuleElement {
    data: RuleElementData & {
        adjustment?: CheckDCModifiers;
    };
    get actor(): CharacterPF2e | NPCPF2e;
}
export { AdjustDegreeOfSuccessRuleElement };
