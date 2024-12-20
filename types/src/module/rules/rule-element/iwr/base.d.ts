import { Immunity, IWRSource, Resistance, Weakness } from "@actor/data/iwr.ts";
import { IWRType } from "@actor/types.ts";
import type { Predicate } from "@system/predication.ts";
import { DataUnionField, PredicateField, StrictArrayField, StrictStringField } from "@system/schema-data-fields.ts";
import { AELikeChangeMode } from "../ae-like.ts";
import { RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSchema, RuleElementSource, RuleValue } from "../data.ts";
import fields = foundry.data.fields;

/** @category RuleElement */
declare abstract class IWRRuleElement<TSchema extends IWRRuleSchema> extends RuleElementPF2e<TSchema> {
    #private;
    abstract value: RuleValue | null;
    static get dictionary(): Record<string, string | undefined>;
    static defineSchema(): IWRRuleSchema;
    protected static createExceptionsField<TType extends string>(types?: Record<TType, string>): StrictArrayField<IWRExceptionField<TType>>;
    static validateJoint(source: SourceFromSchema<IWRRuleSchema>): void;
    /** A reference to the pertinent property in actor system data */
    abstract get property(): IWRSource[];
    abstract getIWR(value?: number): Immunity[] | Weakness[] | Resistance[];
    afterPrepareData(): void;
}
interface IWRRuleElement<TSchema extends IWRRuleSchema> extends RuleElementPF2e<TSchema>, ModelPropsFromRESchema<IWRRuleSchema> {
    constructor: typeof IWRRuleElement<TSchema>;
}
type IWRRuleSchema = RuleElementSchema & {
    /** Whether to add or remove an immunity, weakness, or resistance (default is "add") */
    mode: fields.StringField<IWRChangeMode, IWRChangeMode, true, false, true>;
    /** One or more IWR types: "custom" is also an acceptable value, but it must be used in isolation. */
    type: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    /**
     * A list of exceptions, which may include string values corresponding with the IWR type or objects defining custom
     * exceptions
     */
    exceptions: StrictArrayField<IWRExceptionField>;
    /** A definition for a "custom"-type IWR */
    definition: PredicateField<false, false, false>;
    /** Whether to override an existing IWR of the same type, even if it's higher */
    override: fields.BooleanField;
};
type IWRExceptionField<TType extends string = string> = DataUnionField<StrictStringField<TType, TType, true, false, false> | fields.SchemaField<{
    definition: PredicateField<true, false, false>;
    label: StrictStringField<string, string, true, false, false>;
}>, true, false, false>;
type IWRException<TType extends IWRType = IWRType> = TType | {
    definition: Predicate;
    label: string;
};
type IWRChangeMode = Extract<AELikeChangeMode, "add" | "remove">;
interface IWRRuleElementSource extends RuleElementSource {
    mode?: unknown;
    type?: unknown;
    exceptions?: unknown;
    override?: unknown;
}
export { IWRRuleElement };
export type { IWRException, IWRExceptionField, IWRRuleElementSource, IWRRuleSchema };
