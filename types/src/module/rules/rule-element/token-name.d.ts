import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

/**
 * Change the name representing an actor's token
 * @category RuleElement
 */
declare class TokenNameRuleElement extends RuleElementPF2e<TokenNameRuleSchema> {
    static defineSchema(): TokenNameRuleSchema;
    afterPrepareData(): void;
}
interface TokenNameRuleElement extends RuleElementPF2e<TokenNameRuleSchema>, ModelPropsFromRESchema<TokenNameRuleSchema> {
}
type TokenNameRuleSchema = RuleElementSchema & {
    value: fields.StringField<string, string, true, false, false>;
};
export { TokenNameRuleElement };
