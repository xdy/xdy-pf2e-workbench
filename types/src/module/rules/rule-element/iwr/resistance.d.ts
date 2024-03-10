import { Resistance } from "@actor/data/iwr.ts";
import { ResistanceType } from "@actor/types.ts";
import type { StrictArrayField } from "@system/schema-data-fields.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleValue } from "../data.ts";
import { IWRException, IWRExceptionField, IWRRuleElement, IWRRuleSchema } from "./base.ts";
/** @category RuleElement */
declare class ResistanceRuleElement extends IWRRuleElement<ResistanceRuleSchema> {
    static defineSchema(): ResistanceRuleSchema;
    static get dictionary(): Record<ResistanceType, string>;
    get property(): Resistance[];
    getIWR(value: number): Resistance[];
}
interface ResistanceRuleElement extends IWRRuleElement<ResistanceRuleSchema>, ModelPropsFromRESchema<ResistanceRuleSchema> {
    value: RuleValue;
    type: ResistanceType[];
    exceptions: IWRException<ResistanceType>[];
}
type ResistanceRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    value: ResolvableValueField<true, false, false>;
    exceptions: StrictArrayField<IWRExceptionField<ResistanceType>>;
    doubleVs: StrictArrayField<IWRExceptionField<ResistanceType>>;
};
export { ResistanceRuleElement };
