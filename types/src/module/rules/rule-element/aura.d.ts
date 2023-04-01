import { AuraColors, AuraEffectData } from "@actor/types";
import { ItemPF2e } from "@item";
import { EffectTrait } from "@item/abstract-effect/data";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./";
import { ActorPF2e } from "@actor";
/** A Pathfinder 2e aura, capable of transmitting effects and with a visual representation on the canvas */
export declare class AuraRuleElement extends RuleElementPF2e {
    #private;
    slug: string;
    /** The radius of the order in feet, or a string that will resolve to one */
    radius: number | string;
    /** References to effects included in this aura */
    effects: AuraREEffectData[];
    /** Associated traits, including ones that determine transmission through walls ("visual", "auditory") */
    traits: EffectTrait[];
    /**
     * Custom border and fill colors for the aura: if omitted, the border color will be black, and the fill color the
     * user's assigned color
     */
    colors: AuraColors | null;
    constructor(source: AuraRuleElementSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    afterPrepareData(): void;
}
interface AuraRuleElementSource extends RuleElementSource {
    radius?: unknown;
    effects?: unknown;
    traits?: unknown;
    colors?: unknown;
}
interface AuraREEffectData extends Omit<AuraEffectData, "level"> {
    level?: string | number;
}
export {};
