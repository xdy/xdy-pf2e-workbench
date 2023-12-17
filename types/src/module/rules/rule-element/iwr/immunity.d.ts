import { Immunity } from "@actor/data/iwr.ts";
import { ImmunityType } from "@actor/types.ts";
import type { StrictArrayField } from "@system/schema-data-fields.ts";
import { ModelPropsFromRESchema } from "../data.ts";
import { IWRException, IWRExceptionField, IWRRuleElement, IWRRuleSchema } from "./base.ts";
/** @category RuleElement */
declare class ImmunityRuleElement extends IWRRuleElement<ImmunityRuleSchema> {
    /** Immunities don't take values */
    readonly value: null;
    static defineSchema(): ImmunityRuleSchema;
    static get dictionary(): Record<ImmunityType, string>;
    get property(): Immunity[];
    getIWR(): Immunity[];
}
interface ImmunityRuleElement extends IWRRuleElement<ImmunityRuleSchema>, ModelPropsFromRESchema<ImmunityRuleSchema> {
    type: ImmunityType[];
    exceptions: IWRException<ImmunityType>[];
}
type ImmunityRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    exceptions: StrictArrayField<IWRExceptionField<ImmunityType>>;
};
export { ImmunityRuleElement };
