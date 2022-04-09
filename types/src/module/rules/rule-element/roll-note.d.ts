import { RuleElementPF2e, BracketedValue, RuleElementData } from "./";
/**
 * @category RuleElement
 */
export declare class RollNoteRuleElement extends RuleElementPF2e {
    beforePrepareData(): void;
}
export interface RollNoteRuleElement {
    data: RuleElementData & {
        outcome?: string[];
        text: BracketedValue | string;
    };
}
