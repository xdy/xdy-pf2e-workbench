import { ImmunityData } from "@actor/data/iwr";
import { ImmunityType } from "@actor/types";
import { ArrayField, ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.mjs";
import { IWRRuleElement, IWRRuleSchema } from "./base";
/** @category RuleElement */
declare class ImmunityRuleElement extends IWRRuleElement<ImmunityRuleSchema> {
    static defineSchema(): ImmunityRuleSchema;
    static get dictionary(): Record<ImmunityType, string>;
    get property(): ImmunityData[];
    getIWR(): ImmunityData[];
}
interface ImmunityRuleElement extends IWRRuleElement<ImmunityRuleSchema>, ModelPropsFromSchema<ImmunityRuleSchema> {
    type: ImmunityType[];
    exceptions: ImmunityType[];
}
type ImmunityRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    exceptions: ArrayField<StringField<ImmunityType, ImmunityType, true, false, false>>;
};
export { ImmunityRuleElement };
