import type { GrantItemRuleElement, GrantItemSource } from "@module/rules/rule-element/grant-item/rule-element.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the GrantItem rule element */
declare class GrantItemForm extends RuleElementForm<GrantItemSource, GrantItemRuleElement> {
    template: string;
    getData(): Promise<GrantItemFormSheetData>;
    updateObject(ruleData: DeepPartial<GrantItemSource> & Partial<Record<string, JSONValue>>): void;
}
interface GrantItemFormSheetData extends RuleElementFormSheetData<GrantItemSource, GrantItemRuleElement> {
    granted: ClientDocument | null;
}
export { GrantItemForm };
