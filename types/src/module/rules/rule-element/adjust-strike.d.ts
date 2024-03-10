import type { ActorType } from "@actor/types.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { AELikeChangeMode } from "./ae-like.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
declare class AdjustStrikeRuleElement extends RuleElementPF2e<AdjustStrikeSchema> {
    protected static validActorTypes: ActorType[];
    constructor(data: AdjustStrikeSource, options: RuleElementOptions);
    static VALID_PROPERTIES: Set<"traits" | "materials" | "property-runes" | "range-increment" | "weapon-traits">;
    static defineSchema(): AdjustStrikeSchema;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    beforePrepareData(): void;
}
interface AdjustStrikeRuleElement extends RuleElementPF2e<AdjustStrikeSchema>, ModelPropsFromRESchema<AdjustStrikeSchema> {
}
type AdjustStrikeSchema = RuleElementSchema & {
    mode: StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    /** The property of the strike to adjust */
    property: StringField<AdjustStrikeProperty, AdjustStrikeProperty, true, false, false>;
    /** The definition of the strike in terms of its item (weapon) roll options */
    definition: PredicateField;
    value: ResolvableValueField<true, false, false>;
};
type AdjustStrikeProperty = SetElement<(typeof AdjustStrikeRuleElement)["VALID_PROPERTIES"]>;
interface AdjustStrikeSource extends RuleElementSource {
    mode?: unknown;
    property?: unknown;
    definition?: unknown;
}
export { AdjustStrikeRuleElement };
