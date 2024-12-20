import type { CreaturePF2e } from "@actor";
import { AttributeString } from "@actor/types.ts";
import { MagicTradition } from "@item/spell/types.ts";
import { Predicate, RawPredicate } from "@system/predication.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import { RuleElementPF2e } from "../index.ts";
import type { RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

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
    type: fields.StringField<StatisticType, StatisticType, true, false, true>;
    /** A base statistic from which to extend */
    extends: fields.StringField<string, string, true, true, true>;
    /** An attribute to associate with the statistic */
    attribute: fields.StringField<AttributeString, AttributeString, false, true, true>;
    /** A base modifier for use with NPC special statistics: separate check and DC values may also be specified. */
    baseModifier: fields.SchemaField<{
        mod: fields.NumberField<number, number, false, true, true>;
        check: fields.NumberField<number, number, false, true, true>;
        dc: fields.NumberField<number, number, false, true, true>;
    }, {
        mod: number | null;
        check: number | null;
        dc: number | null;
    }, {
        mod: number | null;
        check: number | null;
        dc: number | null;
    }, false, true, true>;
    itemCasting: fields.SchemaField<ItemCastingSchema, {
        predicate: RawPredicate;
        tradition: MagicTradition | null;
    }, {
        predicate: Predicate;
        tradition: MagicTradition | null;
    }, false, true, true>;
};
type ItemCastingSchema = {
    predicate: PredicateField<true, false, false>;
    tradition: fields.StringField<MagicTradition, MagicTradition, false, true, true>;
};
type StatisticType = "simple" | "check" | "attack-roll";
export { SpecialStatisticRuleElement };
