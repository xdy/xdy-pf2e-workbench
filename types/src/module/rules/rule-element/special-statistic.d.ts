import { AttributeString } from "@actor/types.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "../index.ts";
import type { RuleElementSchema } from "./data.ts";
/** Create a special-purpose statistic for use in checks and as a DC */
declare class SpecialStatisticRuleElement extends RuleElementPF2e<StatisticRESchema> {
    static defineSchema(): StatisticRESchema;
    afterPrepareData(): void;
}
interface SpecialStatisticRuleElement extends RuleElementPF2e<StatisticRESchema>, ModelPropsFromSchema<StatisticRESchema> {
    slug: string;
}
type StatisticRESchema = RuleElementSchema & {
    type: StringField<StatisticType, StatisticType, true, false, true>;
    extends: StringField<string, string, true, true, true>;
    attribute: StringField<AttributeString, AttributeString, true, true, true>;
};
type StatisticType = "simple" | "check" | "attack-roll";
export { SpecialStatisticRuleElement };
