import { WeaknessData } from "@actor/data/iwr.ts";
import { WeaknessType } from "@actor/types.ts";
import type { ArrayField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "../data.ts";
import { IWRRuleElement, IWRRuleSchema } from "./base.ts";
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
    value: ResolvableValueField<true, false, false>;
    exceptions: ArrayField<StringField<WeaknessType, WeaknessType, true, false, false>>;
};
export { WeaknessRuleElement };
