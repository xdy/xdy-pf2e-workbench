import { ResistanceData } from "@actor/data/iwr";
import { ResistanceType } from "@actor/types";
import { ArrayField, ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.mjs";
import { IWRRuleElement, IWRRuleSchema } from "./base";
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
    exceptions: ArrayField<StringField<ResistanceType, ResistanceType, true, false, false>>;
    doubleVs: ArrayField<StringField<ResistanceType, ResistanceType, true, false, false>>;
};
export { ResistanceRuleElement };
