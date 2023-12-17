import type { CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElementPF2e<BaseSpeedRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    static defineSchema(): BaseSpeedRuleSchema;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface BaseSpeedRuleElement extends RuleElementPF2e<BaseSpeedRuleSchema>, ModelPropsFromRESchema<BaseSpeedRuleSchema> {
    get actor(): CreaturePF2e;
}
type BaseSpeedRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, true>;
};
export { BaseSpeedRuleElement };
