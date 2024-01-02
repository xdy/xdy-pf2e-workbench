import { RuleElementSource } from "@module/rules/index.ts";
import type { TokenImageRuleElement } from "@module/rules/rule-element/token-image.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
declare class TokenImageForm extends RuleElementForm<RuleElementSource, TokenImageRuleElement> {
    template: string;
    getData(): Promise<TokenImageFormSheetData>;
    activateListeners(html: HTMLElement): void;
}
interface TokenImageFormSheetData extends RuleElementFormSheetData<RuleElementSource, TokenImageRuleElement> {
    alphaEnabled: boolean;
    scaleEnabled: boolean;
}
export { TokenImageForm };
