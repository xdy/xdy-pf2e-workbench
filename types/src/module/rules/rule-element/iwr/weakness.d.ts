import { WeaknessData } from "@actor/data/iwr";
import { WeaknessType } from "@actor/types";
import { ArrayField, ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.mjs";
import { IWRRuleElement, IWRRuleSchema } from "./base";
/** @category RuleElement */
declare class WeaknessRuleElement extends IWRRuleElement<WeaknessRuleSchema> {
    static defineSchema(): WeaknessRuleSchema;
    static get dictionary(): Record<WeaknessType, string>;
    get property(): WeaknessData[];
    getIWR(value: number): WeaknessData[];
}
interface WeaknessRuleElement extends IWRRuleElement<WeaknessRuleSchema>, ModelPropsFromSchema<WeaknessRuleSchema> {
    type: WeaknessType[];
    exceptions: WeaknessType[];
}
type WeaknessRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    exceptions: ArrayField<StringField<WeaknessType, WeaknessType, true, false, false>>;
};
export { WeaknessRuleElement };
