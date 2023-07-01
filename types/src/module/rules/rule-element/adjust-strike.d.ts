import { ActorType } from "@actor/data/index.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { AELikeRuleElement, AELikeSchema, AELikeSource } from "./ae-like.ts";
import { RuleElementOptions } from "./base.ts";
import { ResolvableValueField } from "./data.ts";
declare class AdjustStrikeRuleElement extends AELikeRuleElement<AdjustStrikeSchema> {
    protected static validActorTypes: ActorType[];
    constructor(data: AdjustStrikeSource, options: RuleElementOptions);
    static VALID_PROPERTIES: Set<"traits" | "materials" | "range-increment" | "weapon-traits" | "property-runes">;
    static defineSchema(): AdjustStrikeSchema;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    applyAELike(): void;
    /** Score the trait value. If it's a dice roll, use the average roll, otherwise just use the number */
    static getTraitScore(traitValue: string): number;
}
interface AdjustStrikeRuleElement extends AELikeRuleElement<AdjustStrikeSchema>, ModelPropsFromSchema<AdjustStrikeSchema> {
}
type AdjustStrikeSchema = Omit<AELikeSchema, "value"> & {
    /** The property of the strike to adjust */
    property: StringField<AdjustStrikeProperty, AdjustStrikeProperty, true, false, false>;
    /** The definition of the strike in terms of its item (weapon) roll options */
    definition: PredicateField;
    value: ResolvableValueField<true, false, false>;
};
type AdjustStrikeProperty = SetElement<(typeof AdjustStrikeRuleElement)["VALID_PROPERTIES"]>;
interface AdjustStrikeSource extends Exclude<AELikeSource, "path"> {
    property?: unknown;
    definition?: unknown;
}
export { AdjustStrikeRuleElement };
