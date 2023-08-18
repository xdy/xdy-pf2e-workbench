import { AuraColors, SaveType } from "@actor/types.ts";
import { EffectTrait } from "@item/abstract-effect/data.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import type { ArrayField, BooleanField, ColorField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField, RuleElementSchema, RuleValue } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
/** A Pathfinder 2e aura, capable of transmitting effects and with a visual representation on the canvas */
declare class AuraRuleElement extends RuleElementPF2e<AuraSchema> {
    #private;
    constructor(source: AuraRuleElementSource, options: RuleElementOptions);
    static defineSchema(): AuraSchema;
    afterPrepareData(): void;
}
interface AuraRuleElement extends RuleElementPF2e<AuraSchema>, ModelPropsFromSchema<AuraSchema> {
    slug: string;
    effects: AuraEffectREData[];
}
type AuraSchema = RuleElementSchema & {
    /** The radius of the order in feet, or a string that will resolve to one */
    radius: ResolvableValueField<true, false, false>;
    /** An optional level for the aura, to be used to set the level of the effects it transmits */
    level: ResolvableValueField<false, true, true>;
    /** Associated traits, including ones that determine transmission through walls ("visual", "auditory") */
    traits: ArrayField<StringField<EffectTrait, EffectTrait, true, false, false>, EffectTrait[], EffectTrait[], true, false, true>;
    /** References to effects included in this aura */
    effects: ArrayField<SchemaField<AuraEffectSchema>, SourceFromSchema<AuraEffectSchema>[], ModelPropsFromSchema<AuraEffectSchema>[], false, false, true>;
    /**
     * Custom border and fill colors for the aura: if omitted, the border color will be black, and the fill color the
     * user's assigned color
     */
    colors: SchemaField<{
        border: ColorField;
        fill: ColorField;
    }, AuraColors, AuraColors, false, true, true>;
    /**
     * If another aura with the same slug is already being emitted, merge this aura's data in with the other's,
     * combining traits and effects as well as merging `colors` data.
     */
    mergeExisting: BooleanField<boolean, boolean, false, false, true>;
};
type AuraEffectSchema = {
    uuid: StringField<string, string, true, false, false>;
    affects: StringField<"allies" | "enemies" | "all", "allies" | "enemies" | "all", true, false, true>;
    events: ArrayField<StringField<"enter" | "turn-start" | "turn-end", "enter" | "turn-start" | "turn-end", true, false, false>, ("enter" | "turn-start" | "turn-end")[], ("enter" | "turn-start" | "turn-end")[], true, false, true>;
    save: SchemaField<{
        type: StringField<SaveType, SaveType, true, false, false>;
        dc: ResolvableValueField<true, false, false>;
    }, {
        type: SaveType;
        dc: RuleValue;
    }, {
        type: SaveType;
        dc: RuleValue;
    }, true, true, true>;
    predicate: PredicateField<false, false, true>;
    removeOnExit: BooleanField<boolean, boolean, false, false, false>;
    includesSelf: BooleanField<boolean, boolean, false, false, false>;
};
interface AuraEffectREData extends ModelPropsFromSchema<AuraEffectSchema> {
    includesSelf: boolean;
    removeOnExit: boolean;
}
interface AuraRuleElementSource extends RuleElementSource {
    radius?: unknown;
    effects?: unknown;
    traits?: unknown;
    colors?: unknown;
}
export { AuraRuleElement };
