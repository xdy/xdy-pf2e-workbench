import { RuleElementSchema, RuleElementSource } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e } from "./index.ts";
import type { ObjectField } from "types/foundry/common/data/fields.d.ts";
import type { LightDataSchema } from "types/foundry/common/data/data.d.ts";
/**
 * Add or change the light emitted by a token
 * @category RuleElement
 */
declare class TokenLightRuleElement extends RuleElementPF2e<TokenLightRuleSchema> {
    static defineSchema(): TokenLightRuleSchema;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    validateData(): void;
    afterPrepareData(): void;
}
interface TokenLightRuleElement extends RuleElementPF2e<TokenLightRuleSchema>, ModelPropsFromSchema<TokenLightRuleSchema> {
}
type TokenLightRuleSchema = RuleElementSchema & {
    value: ObjectField<DeepPartial<SourceFromSchema<LightDataSchema>>>;
};
export { TokenLightRuleElement };
