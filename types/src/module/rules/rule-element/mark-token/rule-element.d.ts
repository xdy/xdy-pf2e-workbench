import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "../index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
/** Remember a token for later referencing */
declare class MarkTokenRuleElement extends RuleElementPF2e<MarkTokenRuleSchema> {
    #private;
    /** A unique slug to identify the mark as a roll option */
    slug: string;
    static defineSchema(): MarkTokenRuleSchema;
    constructor(data: MarkTokenSource, options: RuleElementOptions);
    preCreate({ ruleSource, itemSource, pendingItems }: RuleElementPF2e.PreCreateParams): Promise<void>;
    beforePrepareData(): void;
}
type MarkTokenRuleSchema = RuleElementSchema & {
    tokenUUID: StringField<string, string, false, true, true>;
};
interface MarkTokenRuleElement extends RuleElementPF2e<MarkTokenRuleSchema>, ModelPropsFromSchema<MarkTokenRuleSchema> {
}
interface MarkTokenSource extends RuleElementSource {
    slug?: unknown;
    tokenUUID?: unknown;
}
export { MarkTokenRuleElement };
