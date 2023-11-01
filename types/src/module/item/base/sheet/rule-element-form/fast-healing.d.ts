import type { FastHealingRuleElement, FastHealingSource, FastHealingType } from "@module/rules/rule-element/fast-healing.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
declare class FastHealingForm extends RuleElementForm<FastHealingSource, FastHealingRuleElement> {
    template: string;
    activateListeners(html: HTMLElement): void;
    getData(): Promise<FastHealingSheetData>;
    updateObject(source: FastHealingSource): void;
}
interface FastHealingSheetData extends RuleElementFormSheetData<FastHealingSource, FastHealingRuleElement> {
    types: Record<FastHealingType, string>;
}
export { FastHealingForm };
