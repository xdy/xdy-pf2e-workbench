import type { CreaturePF2e } from "@actor";
import { AttributeString } from "@actor/types.ts";
import { MagicTradition } from "@item/spell/types.ts";
import { PredicatePF2e, RawPredicate } from "@system/predication.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import type { NumberField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "../index.ts";
import type { RuleElementSchema } from "./data.ts";
/** Create a special-purpose statistic for use in checks and as a DC */
declare class SpecialStatisticRuleElement extends RuleElementPF2e<SpecialStatisticSchema> {
    static validActorTypes: ("character" | "npc")[];
    static defineSchema(): SpecialStatisticSchema;
    afterPrepareData(): void;
}
interface SpecialStatisticRuleElement extends RuleElementPF2e<SpecialStatisticSchema>, Omit<ModelPropsFromSchema<SpecialStatisticSchema>, "label"> {
    slug: string;
    get actor(): CreaturePF2e;
}
type SpecialStatisticSchema = RuleElementSchema & {
    type: StringField<StatisticType, StatisticType, true, false, true>;
    /** A base statistic from which to extend */
    extends: StringField<string, string, true, true, true>;
    /** An attribute to associate with the statistic */
    attribute: StringField<AttributeString, AttributeString, false, true, true>;
    /** A base modifier for use with NPC special statistics: separate check and DC values may also be specified. */
    baseModifier: SchemaField<{
        mod: NumberField<number, number, false, true, true>;
        check: NumberField<number, number, false, true, true>;
        dc: NumberField<number, number, false, true, true>;
    }, {
        mod: number | null;
        check: number | null;
        dc: number | null;
    }, {
        mod: number | null;
        check: number | null;
        dc: number | null;
    }, false, true, true>;
    itemCasting: SchemaField<ItemCastingSchema, {
        predicate: RawPredicate;
        tradition: MagicTradition | null;
    }, {
        predicate: PredicatePF2e;
        tradition: MagicTradition | null;
    }, false, true, true>;
};
type ItemCastingSchema = {
    predicate: PredicateField<true, false, false>;
    tradition: StringField<MagicTradition, MagicTradition, false, true, true>;
};
type StatisticType = "simple" | "check" | "attack-roll";
export { SpecialStatisticRuleElement };
