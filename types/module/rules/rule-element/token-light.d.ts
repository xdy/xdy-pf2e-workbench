import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementData, RuleElementOptions } from "./";
import { RuleElementSource } from "./data";
/**
 * Add or change the light emitted by a token
 * @category RuleElement
 */
declare class TokenLightRuleElement extends RuleElementPF2e {
    constructor(data: RuleElementSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
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
