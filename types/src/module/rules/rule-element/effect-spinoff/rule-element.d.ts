import type { ActorPF2e } from "@actor";
import type { PhysicalItemPF2e } from "@item";
import { SlugField } from "@system/schema-data-fields.ts";
import { RuleElementOptions, RuleElementPF2e } from "../base.ts";
import type { ModelPropsFromRESchema, RuleElementSchema, RuleElementSource } from "../data.ts";
import fields = foundry.data.fields;

declare class EffectSpinoffRuleElement extends RuleElementPF2e<EffectSpinoffSchema> {
    constructor(source: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): EffectSpinoffSchema;
    /** Allow an effect spinoff to be available even if its parent is an unequipped physical item. */
    protected _initialize(options?: Record<string, unknown> | undefined): void;
    afterPrepareData(): void;
}
interface EffectSpinoffRuleElement extends RuleElementPF2e<EffectSpinoffSchema>, ModelPropsFromRESchema<EffectSpinoffSchema> {
    slug: string;
    get item(): PhysicalItemPF2e<ActorPF2e>;
}
type ActivateTimeUnit = "actions" | "reaction" | "minutes" | "hours";
type ActivationTrait = "concentrate" | "manipulate";
type ActivationSchema = fields.SchemaField<{
    label: fields.StringField<string, string, true, true, true>;
    time: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        unit: fields.StringField<ActivateTimeUnit, ActivateTimeUnit, true, false, false>;
    }>;
    traits: fields.ArrayField<fields.StringField<"concentrate" | "manipulate", "concentrate" | "manipulate", true, false, false>>;
    details: fields.StringField<string, string, false, true, true>;
}, {
    label: string | null;
    time: {
        value: number;
        unit: ActivateTimeUnit;
    };
    details: string | null;
    traits: ActivationTrait[];
}, {
    label: string | null;
    time: {
        value: number;
        unit: ActivateTimeUnit;
    };
    details: string | null;
    traits: ActivationTrait[];
}, true, true, true>;
type EffectSpinoffSchema = Omit<RuleElementSchema, "slug"> & {
    slug: SlugField<true, false, false>;
    activation: ActivationSchema;
    description: fields.StringField<string, string, false, true, true>;
};
export { EffectSpinoffRuleElement };
