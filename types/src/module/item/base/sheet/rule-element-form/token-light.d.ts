import type { TokenLightRuleElement, TokenLightRuleSource } from "@module/rules/rule-element/token-light.ts";
import { RuleElementForm, RuleElementFormSheetData, RuleElementFormTabData } from "./base.ts";
declare class TokenLightForm extends RuleElementForm<TokenLightRuleSource, TokenLightRuleElement> {
    template: string;
    protected tabs: RuleElementFormTabData;
    getData(): Promise<TokenLightSheetData>;
}
interface TokenLightSheetData extends RuleElementFormSheetData<TokenLightRuleSource, TokenLightRuleElement> {
    colorationTechniques: typeof AdaptiveLightingShader.SHADER_TECHNIQUES;
    light: TokenLightRuleSource["value"];
    lightAnimations: Record<keyof typeof CONFIG.Canvas.lightAnimations, string>;
}
export { TokenLightForm };
