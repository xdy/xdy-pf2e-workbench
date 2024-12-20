import type { DamageType } from "@system/damage/types.ts";
import { StrictArrayField } from "@system/schema-data-fields.ts";
import { type AELikeChangeMode } from "../ae-like.ts";
import type { ModelPropsFromRESchema, RuleElementSchema } from "../data.ts";
import { ResolvableValueField, RuleElementPF2e } from "../index.ts";
import fields = foundry.data.fields;

/** Alter certain aspects of individual components (modifiers and dice) of a damage roll. */
declare class DamageAlterationRuleElement extends RuleElementPF2e<DamageAlterationSchema> {
    static defineSchema(): DamageAlterationSchema;
    resolveValue(value: unknown, defaultValue: null, options: {
        resolvables: Record<string, unknown>;
    }): DamageAlterationValue | null;
    beforePrepareData(): void;
}
interface DamageAlterationRuleElement extends RuleElementPF2e<DamageAlterationSchema>, ModelPropsFromRESchema<DamageAlterationSchema> {
}
type DamageAlterationProperty = "dice-faces" | "dice-number" | "damage-type" | "tags";
type DamageAlterationSchema = RuleElementSchema & {
    selectors: StrictArrayField<fields.StringField<string, string, true, false, false>>;
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    property: fields.StringField<DamageAlterationProperty, DamageAlterationProperty, true, false, false>;
    value: ResolvableValueField<true, true, true>;
    /** An optional relabeling of the altered unit of damage */
    relabel: fields.StringField<string, string, false, true, true>;
};
type DamageAlterationValue = DamageType | number | string[];
export { DamageAlterationRuleElement };
export type { DamageAlterationProperty, DamageAlterationValue };
