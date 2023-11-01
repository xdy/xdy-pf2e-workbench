import { ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e } from "./index.ts";
import type { SchemaField } from "types/foundry/common/data/fields.d.ts";
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
type TokenLightValueSchema = Omit<LightDataSchema, "dim" | "bright"> & {
    dim: ResolvableValueField<false, false, false>;
    bright: ResolvableValueField<false, false, false>;
};
type TokenLightRuleSchema = RuleElementSchema & {
    value: SchemaField<TokenLightValueSchema>;
};
type TokenLightRuleSource = SourceFromSchema<TokenLightRuleSchema>;
export { TokenLightRuleElement };
export type { TokenLightRuleSource };
