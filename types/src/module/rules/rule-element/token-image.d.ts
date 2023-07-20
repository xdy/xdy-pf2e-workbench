import { ResolvableValueField } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
import type { ColorField, NumberField } from "types/foundry/common/data/fields.d.ts";
/**
 * Change the image representing an actor's token
 * @category RuleElement
 */
declare class TokenImageRuleElement extends RuleElementPF2e<TokenImageRuleSchema> {
    #private;
    static defineSchema(): TokenImageRuleSchema;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    afterPrepareData(): void;
}
interface TokenImageRuleElement extends RuleElementPF2e<TokenImageRuleSchema>, ModelPropsFromSchema<TokenImageRuleSchema> {
}
type TokenImageRuleSchema = RuleElementSchema & {
    /** An image or video path */
    value: ResolvableValueField<true, false, false>;
    /** An optional scale adjustment */
    scale: NumberField<number, number, false, false, false>;
    /** An optional tint adjustment */
    tint: ColorField<false, false, false>;
    /** An optional alpha adjustment */
    alpha: NumberField<number, number, false, false, false>;
};
export { TokenImageRuleElement };
