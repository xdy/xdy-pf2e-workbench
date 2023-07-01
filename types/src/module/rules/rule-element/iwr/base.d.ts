import { IWRSource, ImmunityData, ResistanceData, WeaknessData } from "@actor/data/iwr.ts";
import type { ArrayField, BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { AELikeChangeMode } from "../ae-like.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource, RuleValue } from "../index.ts";
/** @category RuleElement */
declare abstract class IWRRuleElement<TSchema extends IWRRuleSchema> extends RuleElementPF2e<TSchema> {
    #private;
    abstract value: RuleValue;
    constructor(data: IWRRuleElementSource, options: RuleElementOptions);
    static get dictionary(): Record<string, string | undefined>;
    static defineSchema(): IWRRuleSchema;
    static validateJoint(source: SourceFromSchema<IWRRuleSchema>): void;
    /** A reference to the pertinent property in actor system data */
    abstract get property(): IWRSource[];
    abstract getIWR(value?: number): ImmunityData[] | WeaknessData[] | ResistanceData[];
    afterPrepareData(): void;
}
interface IWRRuleElement<TSchema extends IWRRuleSchema> extends RuleElementPF2e<TSchema>, Omit<ModelPropsFromSchema<IWRRuleSchema>, "exceptions"> {
    constructor: typeof IWRRuleElement<TSchema>;
    exceptions: string[];
}
type IWRRuleSchema = RuleElementSchema & {
    /** Whether to add or remove an immunity, weakness, or resistance (default is "add") */
    mode: StringField<IWRChangeMode, IWRChangeMode, true, false, true>;
    type: ArrayField<StringField<string, string, true, false, false>>;
    exceptions: ArrayField<StringField<string, string, true, false, false>>;
    override: BooleanField;
};
type IWRChangeMode = Extract<AELikeChangeMode, "add" | "remove">;
interface IWRRuleElementSource extends RuleElementSource {
    mode?: unknown;
    type?: unknown;
    exceptions?: unknown;
    override?: unknown;
}
export { IWRRuleElement, IWRRuleElementSource, IWRRuleSchema };
