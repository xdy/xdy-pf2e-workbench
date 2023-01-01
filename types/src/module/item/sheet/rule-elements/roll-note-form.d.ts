import { RuleElementForm } from "./base";
/** Form handler for the RollNote rule element */
declare class RollNoteForm extends RuleElementForm {
    private html;
    template: string;
    activateListeners(html: HTMLElement): void;
    _updateObject(ruleData: Partial<Record<string, unknown>>): void;
}
export { RollNoteForm };
