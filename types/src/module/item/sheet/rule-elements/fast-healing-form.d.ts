import { FastHealingData, FastHealingRuleElement, FastHealingSource } from "@module/rules/rule-element/fast-healing";
import { RuleElementForm, RuleElementFormSheetData } from "./base";
declare class FastHealingForm extends RuleElementForm<FastHealingSource, FastHealingRuleElement> {
    template: string;
    activateListeners(html: HTMLElement): void;
    getData(): Promise<FastHealingSheetData>;
    _updateObject(formData: Partial<FastHealingSource>): void;
}
interface FastHealingSheetData extends RuleElementFormSheetData<FastHealingSource, FastHealingRuleElement> {
    types: Record<FastHealingData["type"], string>;
}
export { FastHealingForm };
