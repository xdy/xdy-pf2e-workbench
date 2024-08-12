import type { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { AELikeChangeMode } from "../ae-like.ts";
import type { RuleElementPF2e } from "../base.ts";
import { ResolvableValueField } from "../data.ts";
declare class ItemAlteration extends foundry.abstract.DataModel<RuleElementPF2e, ItemAlterationSchema> {
    #private;
    static VALID_PROPERTIES: readonly ["ac-bonus", "area-size", "badge-max", "badge-value", "bulk", "category", "check-penalty", "damage-dice-faces", "damage-type", "defense-passive", "description", "dex-cap", "focus-point-cost", "frequency-max", "frequency-per", "hardness", "hp-max", "material-type", "other-tags", "pd-recovery-dc", "persistent-damage", "rarity", "speed-penalty", "strength", "traits"];
    static defineSchema(): ItemAlterationSchema;
    get rule(): RuleElementPF2e;
    get actor(): ActorPF2e;
    /**
     * Apply this alteration to an item (or source)
     * @param item The item to be altered
     */
    applyTo(item: ItemPF2e<ActorPF2e> | ItemSourcePF2e): void;
}
interface ItemAlteration extends foundry.abstract.DataModel<RuleElementPF2e, ItemAlterationSchema>, ModelPropsFromSchema<ItemAlterationSchema> {
}
type ItemAlterationSchema = {
    mode: StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    property: StringField<ItemAlterationProperty, ItemAlterationProperty, true, false, false>;
    value: ResolvableValueField<true, true, false>;
};
type ItemAlterationProperty = (typeof ItemAlteration.VALID_PROPERTIES)[number];
export { ItemAlteration };
export type { ItemAlterationProperty, ItemAlterationSchema };
