import { RuleElementSource } from "./data.ts";
import { RuleElementData, RuleElementOptions, RuleElementPF2e } from "./index.ts";
/**
 * Add or change the light emitted by a token
 * @category RuleElement
 */
declare class TokenLightRuleElement extends RuleElementPF2e {
    constructor(data: RuleElementSource, options: RuleElementOptions);
    validateData(): void;
    afterPrepareData(): void;
}
interface TokenLightRuleElement extends RuleElementPF2e {
    data: TokenLightData;
}
interface TokenLightData extends RuleElementData {
    value: DeepPartial<foundry.data.LightSource>;
}
export { TokenLightRuleElement };
