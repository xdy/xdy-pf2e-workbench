import { RollNoteRuleElement, RollNoteSource } from "@module/rules/rule-element/roll-note.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the RollNote rule element */
declare class RollNoteForm extends RuleElementForm<RollNoteSource, RollNoteRuleElement> {
    private html;
    template: string;
    getData(): Promise<RollNoteFormSheetData>;
    activateListeners(html: HTMLElement): void;
    updateObject(ruleData: Partial<Record<string, unknown>>): void;
}
interface RollNoteFormSheetData extends RuleElementFormSheetData<RollNoteSource, RollNoteRuleElement> {
    selectorIsArray: boolean;
}
export { RollNoteForm };
