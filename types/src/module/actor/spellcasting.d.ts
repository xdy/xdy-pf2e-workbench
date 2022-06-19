import { ActorPF2e } from "@actor";
import { ConsumablePF2e, SpellcastingEntryPF2e } from "@item";
export declare class ActorSpellcasting extends Collection<SpellcastingEntryPF2e> {
    readonly actor: ActorPF2e;
    constructor(actor: ActorPF2e, entries?: SpellcastingEntryPF2e[]);
    /** Returns a list of entries pre-filtered to SpellcastingEntryPF2e */
    get regular(): SpellcastingEntryPF2e[];
    /**
     * All spellcasting entries that count as prepared/spontaneous, which qualify as a
     * full fledged spellcasting feature for wands and scrolls.
     */
    get spellcastingFeatures(): SpellcastingEntryPF2e[];
    canCastConsumable(item: ConsumablePF2e): boolean;
    refocus(options?: {
        all?: boolean;
    }): {
        "data.resources.focus.value": number;
    } | null;
    /**
     * Recharges all spellcasting entries based on the type of entry it is
     * @todo Support a timespan property of some sort and handle 1/hour innate spells
     */
    recharge(): {
        itemUpdates: ((Record<string, unknown> & {
            _id: string;
        }) | (Partial<import("../item/spellcasting-entry/data/types").SpellcastingEntrySource> & {
            _id: string;
        }))[];
        actorUpdates: {
            "data.resources.focus.value": number;
        } | null;
    };
}
