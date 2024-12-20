import type { ActorPF2e } from "@actor";
import type { ConsumablePF2e, SpellPF2e } from "@item";
import { SpellcastingEntryPF2e } from "@item";
import { SpellCollection } from "@item/spellcasting-entry/collection.ts";
import { RitualSpellcasting } from "@item/spellcasting-entry/rituals.ts";
import { BaseSpellcastingEntry } from "@item/spellcasting-entry/types.ts";
import { Statistic } from "@system/statistic/statistic.ts";
import { DelegatedCollection } from "@util";
import { CreatureSource } from "./data/index.ts";
import { ActorCommitData } from "./types.ts";

export declare class ActorSpellcasting<TActor extends ActorPF2e> extends DelegatedCollection<BaseSpellcastingEntry<TActor>> {
    #private;
    actor: TActor;
    /** The base casting proficiency, off of which spellcasting builds */
    base: Statistic;
    /** All available spell lists on this actor */
    collections: Collection<SpellCollection<TActor>>;
    constructor(actor: TActor, entries: BaseSpellcastingEntry<TActor>[]);
    /** Returns a list of entries pre-filtered to SpellcastingEntryPF2e */
    get regular(): SpellcastingEntryPF2e<TActor>[];
    /** Get this actor's ritual casting ability */
    get ritual(): RitualSpellcasting<TActor> | null;
    /** Spells not belonging to any collection */
    get orphanedSpells(): SpellPF2e<TActor>[];
    /**
     * All spellcasting entries that count as prepared/spontaneous, which qualify as a
     * full fledged spellcasting feature for wands and scrolls.
     */
    get spellcastingFeatures(): SpellcastingEntryPF2e<TActor>[];
    /** Returns an existing spellcasting entry or trick magic item if given "trick-{skillName}" */
    get(id: string): BaseSpellcastingEntry<TActor> | undefined;
    canCastConsumable(item: ConsumablePF2e): boolean;
    refocus(options?: {
        all?: boolean;
    }): DeepPartial<CreatureSource> | null;
    /**
     * Recharges all spellcasting entries based on the type of entry it is
     * @todo Support a timespan property of some sort and handle 1/hour innate spells
     */
    recharge(): ActorCommitData<TActor>;
}
