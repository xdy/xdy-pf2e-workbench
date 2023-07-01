import { ResistanceData } from "@actor/data/iwr.ts";
import { ResistanceType } from "@actor/types.ts";
import type { ArrayField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "../data.ts";
import { IWRRuleElement, IWRRuleSchema } from "./base.ts";
/** @category RuleElement */
declare class ResistanceRuleElement extends IWRRuleElement<ResistanceRuleSchema> {
    static defineSchema(): ResistanceRuleSchema;
    static get dictionary(): Record<ResistanceType, string>;
    get property(): ResistanceData[];
    getIWR(value: number): ResistanceData[];
}
interface ResistanceRuleElement extends IWRRuleElement<ResistanceRuleSchema>, ModelPropsFromSchema<ResistanceRuleSchema> {
    type: ResistanceType[];
    exceptions: ResistanceType[];
}
type ResistanceRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    value: ResolvableValueField<true, false, false>;
    exceptions: ArrayField<StringField<ResistanceType, ResistanceType, true, false, false>>;
    doubleVs: ArrayField<StringField<ResistanceType, ResistanceType, true, false, false>>;
};
export { ResistanceRuleElement };
