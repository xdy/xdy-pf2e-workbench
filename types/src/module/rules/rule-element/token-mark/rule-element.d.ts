import { SlugField } from "@system/schema-data-fields.ts";
import { RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "../data.ts";
import fields = foundry.data.fields;

/** Remember a token for later referencing */
declare class TokenMarkRuleElement extends RuleElementPF2e<TokenMarkSchema> {
    #private;
    static defineSchema(): TokenMarkSchema;
    preCreate({ ruleSource, itemSource, pendingItems }: RuleElementPF2e.PreCreateParams): Promise<void>;
    beforePrepareData(): void;
}
type TokenMarkSchema = Omit<RuleElementSchema, "slug"> & {
    slug: SlugField<true, false, false>;
    uuid: fields.StringField<string, string, false, true, true>;
};
interface TokenMarkRuleElement extends RuleElementPF2e<TokenMarkSchema>, ModelPropsFromRESchema<TokenMarkSchema> {
    slug: string;
}
export { TokenMarkRuleElement };
