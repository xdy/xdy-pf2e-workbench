import type { ActorType, CreaturePF2e } from "@actor";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;

/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElementPF2e<BaseSpeedRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    constructor(data: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): BaseSpeedRuleSchema;
    beforePrepareData(): void;
}
interface BaseSpeedRuleElement extends RuleElementPF2e<BaseSpeedRuleSchema>, ModelPropsFromRESchema<BaseSpeedRuleSchema> {
    get actor(): CreaturePF2e;
}
type BaseSpeedRuleSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, true>;
};
export { BaseSpeedRuleElement };
