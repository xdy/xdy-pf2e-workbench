import { ActorPF2e } from "@actor";
import { SpellPF2e } from "@item";
import { BaseSpellcastingEntry, SpellcastingSlotRank, SpellPrepEntry } from "./types.ts";
declare class SpellCollection<TActor extends ActorPF2e, TEntry extends BaseSpellcastingEntry<TActor | null>> extends Collection<SpellPF2e<TActor>> {
    #private;
    readonly entry: TEntry;
    readonly actor: TActor;
    constructor(entry: TEntry);
    get id(): string;
    get highestRank(): number;
    /**
     * Adds a spell to this spellcasting entry, either moving it from another one if its the same actor,
     * or creating a new spell if its not. If given a rank, it will heighten to that rank if it can be.
     */
    addSpell(spell: SpellPF2e, options?: {
        slotLevel?: number;
    }): Promise<SpellPF2e<TActor> | null>;
    /** Saves the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, slotRank: number, spellSlot: number): Promise<TEntry>;
    /** Removes the spell slot and updates the spellcasting entry */
    unprepareSpell(slotRank: number, spellSlot: number): Promise<TEntry>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(slotRank: number, spellSlot: number, isExpended: boolean): Promise<TEntry>;
    getSpellData(): Promise<SpellCollectionData>;
    protected getSpellPrepList(spells: SpellPF2e<TActor>[]): Record<number, SpellPrepEntry[]> | null;
}
interface SpellCollectionData {
    levels: SpellcastingSlotRank[];
    flexibleAvailable?: {
        value: number;
        max: number;
    } | null;
    spellPrepList: Record<number, SpellPrepEntry[]> | null;
}
export { SpellCollection };
