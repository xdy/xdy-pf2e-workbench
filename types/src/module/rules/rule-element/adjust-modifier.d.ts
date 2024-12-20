import { AELikeChangeMode } from "./ae-like.ts";
import { ModelPropsFromRESchema, ResolvableValueField } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
import fields = foundry.data.fields;

/** Adjust the value of a modifier, change its damage type (in case of damage modifiers) or suppress it entirely */
declare class AdjustModifierRuleElement extends RuleElementPF2e<AdjustModifierSchema> {
    /** The number of times this adjustment has been applied */
    applications: number;
    constructor(source: AdjustModifierSource, options: RuleElementOptions);
    static defineSchema(): AdjustModifierSchema;
    static validateJoint(data: SourceFromSchema<AdjustModifierSchema>): void;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    beforePrepareData(): void;
}
interface AdjustModifierRuleElement extends RuleElementPF2e<AdjustModifierSchema>, ModelPropsFromRESchema<AdjustModifierSchema> {
    suppress: boolean;
    maxApplications: number;
}
type AdjustModifierSchema = RuleElementSchema & {
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    /** An optional relabeling of the adjusted modifier */
    relabel: fields.StringField<string, string, false, true, true>;
    selector: fields.StringField<string, string, false, false, false>;
    selectors: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    damageType: fields.StringField<string, string, false, true, true>;
    /** Rather than changing a modifier's value, ignore it entirely */
    suppress: fields.BooleanField<boolean, boolean, false, false, true>;
    /** The maximum number of times this adjustment can be applied */
    maxApplications: fields.NumberField<number, number, false, true, true>;
    value: ResolvableValueField<false, true, true>;
};
interface AdjustModifierSource extends RuleElementSource {
    mode?: unknown;
    selector?: unknown;
    selectors?: unknown;
    relabel?: unknown;
    damageType?: unknown;
    suppress?: unknown;
}
export { AdjustModifierRuleElement };
