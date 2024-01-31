import type { SaveType } from "@actor/types.ts";
import type { EffectTrait } from "@item/abstract-effect/types.ts";
import { DataUnionField, PredicateField, StrictArrayField, StrictBooleanField, StrictNumberField, StrictStringField } from "@system/schema-data-fields.ts";
import type { AlphaField, ArrayField, BooleanField, ColorField, EmbeddedDataField, SchemaField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource, RuleValue } from "./data.ts";
import { ItemAlteration } from "./item-alteration/alteration.ts";
/** A Pathfinder 2e aura, capable of transmitting effects and with a visual representation on the canvas */
declare class AuraRuleElement extends RuleElementPF2e<AuraSchema> {
    #private;
    constructor(source: AuraRuleElementSource, options: RuleElementOptions);
    static defineSchema(): AuraSchema;
    afterPrepareData(): void;
}
interface AuraRuleElement extends RuleElementPF2e<AuraSchema>, ModelPropsFromRESchema<AuraSchema> {
    slug: string;
    effects: AuraEffectREData[];
}
type AuraSchema = RuleElementSchema & {
    /** The radius of the order in feet, or a string that will resolve to one */
    radius: ResolvableValueField<true, false, true>;
    /** An optional level for the aura, to be used to set the level of the effects it transmits */
    level: ResolvableValueField<false, true, true>;
    /** Associated traits, including ones that determine transmission through walls ("visual", "auditory") */
    traits: ArrayField<StrictStringField<EffectTrait, EffectTrait, true, false, false>, EffectTrait[], EffectTrait[], true, false, true>;
    /** References to effects included in this aura */
    effects: StrictArrayField<SchemaField<AuraEffectSchema>, SourceFromSchema<AuraEffectSchema>[], ModelPropsFromSchema<AuraEffectSchema>[], true, false, true>;
    /**
     * Custom border, highlight, and texture for the aura: if omitted, the border color will be black, the fill
     * color the user's configured color, and no texture.
     */
    appearance: SchemaField<AuraAppearanceSchema, SourceFromSchema<AuraAppearanceSchema>, ModelPropsFromSchema<AuraAppearanceSchema>, true, false, true>;
    /**
     * If another aura with the same slug is already being emitted, merge this aura's data in with the other's,
     * combining traits and effects as well as merging `colors` data.
     */
    mergeExisting: BooleanField<boolean, boolean, true, false, true>;
};
type AuraEffectSchema = {
    uuid: StrictStringField<string, string, true, false, false>;
    affects: StrictStringField<"allies" | "enemies" | "all", "allies" | "enemies" | "all", true, false, true>;
    events: ArrayField<StrictStringField<"enter" | "turn-start" | "turn-end", "enter" | "turn-start" | "turn-end", true, false, false>, ("enter" | "turn-start" | "turn-end")[], ("enter" | "turn-start" | "turn-end")[], true, false, true>;
    save: SchemaField<{
        type: StrictStringField<SaveType, SaveType, true, false, false>;
        dc: ResolvableValueField<true, false, false>;
    }, {
        type: SaveType;
        dc: RuleValue;
    }, {
        type: SaveType;
        dc: RuleValue;
    }, true, true, true>;
    /** A predicating limiting whether the effect is transmitted to an actor */
    predicate: PredicateField<false, false, true>;
    /** Whether to remove the effect from an actor immediately after its token exits the area */
    removeOnExit: StrictBooleanField<true, false, true>;
    /** Whether the effect is applied to the actor emitting the aura */
    includesSelf: StrictBooleanField<false, false, true>;
    /** An array of alterations to apply to the effect before transmitting it */
    alterations: StrictArrayField<EmbeddedDataField<ItemAlteration>>;
};
type AuraAppearanceSchema = {
    /** Configuration of the border's color and alpha */
    border: SchemaField<{
        color: DataUnionField<StrictStringField<"user-color", "user-color", true, false, false> | ColorField<true, false, false>, true, false, true>;
        alpha: AlphaField<true, false, true>;
    }, {
        color: "user-color" | HexColorString;
        alpha: number;
    }, {
        color: "user-color" | HexColorString;
        alpha: number;
    }, false, true, true>;
    /** Configuration of the highlight's color and alpha */
    highlight: SchemaField<{
        color: DataUnionField<StrictStringField<"user-color", "user-color", true, false, false> | ColorField<true, false, false>, true, false, true>;
        alpha: AlphaField<false, false, true>;
    }, {
        color: "user-color" | HexColorString;
        alpha: number;
    }, {
        color: "user-color" | HexColorString;
        alpha: number;
    }, false, false, true>;
    /** Configuration for a texture (image or video) drawn as part of the aura */
    texture: SchemaField<AuraTextureSchema, SourceFromSchema<AuraTextureSchema>, ModelPropsFromSchema<AuraTextureSchema>, false, true, true>;
};
type AuraTextureSchema = {
    /** The path to the texture file: can be injected */
    src: StrictStringField<string, string, true, false, false>;
    alpha: AlphaField<true, false, true>;
    /** A manual rescaling of the texture resource */
    scale: StrictNumberField<number, number, true, false, true>;
    /** A manual x/y translation of the texture resource */
    translation: SchemaField<XYPairSchema, SourceFromSchema<XYPairSchema>, ModelPropsFromSchema<XYPairSchema>, false, true, true>;
    /** If the `src` is a video, whether to loop it */
    loop: StrictBooleanField<false, false, true>;
    /** If the `src` is a video, the playback rate of resulting `HTMLVideoElement` */
    playbackRate: StrictNumberField<number, number, false, false, true>;
};
type XYPairSchema = {
    x: StrictNumberField<number, number, true, false, false>;
    y: StrictNumberField<number, number, true, false, false>;
};
interface AuraEffectREData extends ModelPropsFromSchema<AuraEffectSchema> {
    includesSelf: boolean;
    removeOnExit: boolean;
}
interface AuraRuleElementSource extends RuleElementSource {
    radius?: unknown;
    effects?: unknown;
    traits?: unknown;
}
export { AuraRuleElement };
export type { AuraSchema as AuraRuleElementSchema, AuraTextureSchema as AuraRuleElementTextureSchema };
