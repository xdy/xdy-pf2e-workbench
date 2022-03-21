import { BracketedValue, RuleElementData, RuleElementPF2e } from "./index";

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
