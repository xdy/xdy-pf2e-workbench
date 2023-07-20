import { ResolvableValueField } from "./data.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
/**
 * Change the name representing an actor's token
 * @category RuleElement
 */
declare class TokenNameRuleElement extends RuleElementPF2e<TokenNameRuleSchema> {
    static defineSchema(): TokenNameRuleSchema;
    afterPrepareData(): void;
}
interface TokenNameRuleElement extends RuleElementPF2e<TokenNameRuleSchema>, ModelPropsFromSchema<TokenNameRuleSchema> {
}
type TokenNameRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
};
export { TokenNameRuleElement };
