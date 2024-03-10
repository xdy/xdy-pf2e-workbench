import { ModifierType } from "@actor/modifiers.ts";
import type { FlatModifierRuleElement, FlatModifierSource } from "@module/rules/rule-element/flat-modifier.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the flat modifier rule element */
declare class FlatModifierForm extends RuleElementForm<FlatModifierSource, FlatModifierRuleElement> {
    template: string;
    get isDamage(): boolean;
    activateListeners(html: HTMLElement): void;
    getData(): Promise<FlatModifierFormSheetData>;
    updateObject(formData: Partial<FlatModifierSource> & Partial<Record<string, JSONValue>>): void;
}
interface FlatModifierFormSheetData extends RuleElementFormSheetData<FlatModifierSource, FlatModifierRuleElement> {
    selectorIsArray: boolean;
    abilities: ConfigPF2e["PF2E"]["abilities"];
    types: Record<ModifierType, string>;
    damageCategories: Pick<ConfigPF2e["PF2E"]["damageCategories"], "persistent" | "precision" | "splash">;
    isDamage: boolean;
}
export { FlatModifierForm };
