import type { LightDataSchema } from "types/foundry/common/data/data.d.ts";
import type { SchemaField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

/**
 * Add or change the light emitted by a token
 * @category RuleElement
 */
declare class TokenLightRuleElement extends RuleElementPF2e<TokenLightRuleSchema> {
    static defineSchema(): TokenLightRuleSchema;
    getLightData(): SourceFromSchema<LightDataSchema> | null;
    afterPrepareData(): void;
}
interface TokenLightRuleElement extends RuleElementPF2e<TokenLightRuleSchema>, ModelPropsFromRESchema<TokenLightRuleSchema> {
}
type TokenLightValueSchema = Omit<LightDataSchema, "bright" | "color" | "dim"> & {
    bright: ResolvableValueField<false, false, false>;
    /** `LightData#color` as an injectable property */
    color: fields.StringField<string, string, false, true, true>;
    dim: ResolvableValueField<false, false, false>;
};
type TokenLightRuleSchema = RuleElementSchema & {
    value: SchemaField<TokenLightValueSchema>;
};
type TokenLightRuleSource = SourceFromSchema<TokenLightRuleSchema>;
export { TokenLightRuleElement };
export type { TokenLightRuleSource };
