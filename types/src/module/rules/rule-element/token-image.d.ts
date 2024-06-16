import type { AlphaField, ColorField, NumberField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
/**
 * Change the image representing an actor's token
 * @category RuleElement
 */
declare class TokenImageRuleElement extends RuleElementPF2e<TokenImageRuleSchema> {
    #private;
    static defineSchema(): TokenImageRuleSchema;
    afterPrepareData(): void;
}
interface TokenImageRuleElement extends RuleElementPF2e<TokenImageRuleSchema>, ModelPropsFromRESchema<TokenImageRuleSchema> {
}
type TokenImageRuleSchema = RuleElementSchema & {
    /** An image or video path */
    value: ResolvableValueField<true, false, false>;
    /** An optional scale adjustment */
    scale: NumberField<number, number, false, true, true>;
    /** An optional tint adjustment */
    tint: ColorField;
    /** An optional alpha adjustment */
    alpha: AlphaField<false, true, true>;
};
export { TokenImageRuleElement };
