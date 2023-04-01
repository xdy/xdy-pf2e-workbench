import { ActorPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { PredicateField } from "@system/schema-data-fields";
import { ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.mjs";
import { AELikeRuleElement, AELikeSchema, AELikeSource } from "./ae-like";
import { RuleElementOptions } from "./base";
declare class AdjustStrikeRuleElement extends AELikeRuleElement<AdjustStrikeSchema> {
    protected static validActorTypes: ActorType[];
    constructor(data: AdjustStrikeSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    static VALID_PROPERTIES: Set<"traits" | "materials" | "property-runes" | "range-increment" | "weapon-traits">;
    static defineSchema(): AdjustStrikeSchema;
    protected validateData(): void;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    applyAELike(): void;
    /** Score the trait value. If it's a dice roll, use the average roll, otherwise just use the number */
    static getTraitScore(traitValue: string): number;
}
interface AdjustStrikeRuleElement extends AELikeRuleElement<AdjustStrikeSchema>, ModelPropsFromSchema<AdjustStrikeSchema> {
}
type AdjustStrikeSchema = AELikeSchema & {
    /** The property of the strike to adjust */
    property: StringField<AdjustStrikeProperty, AdjustStrikeProperty, true, false, false>;
    /** The definition of the strike in terms of its item (weapon) roll options */
    definition: PredicateField;
};
type AdjustStrikeProperty = SetElement<(typeof AdjustStrikeRuleElement)["VALID_PROPERTIES"]>;
interface AdjustStrikeSource extends Exclude<AELikeSource, "path"> {
    property?: unknown;
    definition?: unknown;
}
export { AdjustStrikeRuleElement };
