import type { NoteRESource, RollNoteRuleElement } from "@module/rules/rule-element/roll-note.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the RollNote rule element */
declare class RollNoteForm extends RuleElementForm<NoteRESource, RollNoteRuleElement> {
    template: string;
    getData(): Promise<RollNoteFormSheetData>;
    activateListeners(html: HTMLElement): void;
    updateObject(ruleData: Partial<Record<string, JSONValue>>): void;
}
interface RollNoteFormSheetData extends RuleElementFormSheetData<NoteRESource, RollNoteRuleElement> {
    selectorIsArray: boolean;
}
export { RollNoteForm };
