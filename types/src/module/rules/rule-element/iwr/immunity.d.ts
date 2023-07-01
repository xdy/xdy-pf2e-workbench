import { ImmunityData } from "@actor/data/iwr.ts";
import { ImmunityType } from "@actor/types.ts";
import type { ArrayField, StringField } from "types/foundry/common/data/fields.d.ts";
import { IWRRuleElement, IWRRuleSchema } from "./base.ts";
/** @category RuleElement */
declare class ImmunityRuleElement extends IWRRuleElement<ImmunityRuleSchema> {
    /** Immunities don't take values */
    readonly value: null;
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
