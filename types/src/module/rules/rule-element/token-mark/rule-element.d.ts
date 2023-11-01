import { SlugField } from "@system/schema-data-fields.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e, RuleElementSchema } from "../index.ts";
/** Remember a token for later referencing */
declare class TokenMarkRuleElement extends RuleElementPF2e<TokenMarkSchema> {
    #private;
    static defineSchema(): TokenMarkSchema;
    preCreate({ ruleSource, itemSource, pendingItems }: RuleElementPF2e.PreCreateParams): Promise<void>;
    beforePrepareData(): void;
}
type TokenMarkSchema = Omit<RuleElementSchema, "slug"> & {
    slug: SlugField<true, false, false>;
    uuid: StringField<string, string, false, true, true>;
};
interface TokenMarkRuleElement extends RuleElementPF2e<TokenMarkSchema>, ModelPropsFromSchema<TokenMarkSchema> {
    slug: string;
}
export { TokenMarkRuleElement };
