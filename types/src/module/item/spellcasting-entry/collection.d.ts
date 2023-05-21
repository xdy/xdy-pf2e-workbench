import { ActorPF2e } from "@actor";
import { SpellPF2e } from "@item";
import { BaseSpellcastingEntry, SpellcastingSlotLevel, SpellPrepEntry } from "./types.ts";
declare class SpellCollection<TActor extends ActorPF2e, TEntry extends BaseSpellcastingEntry<TActor | null>> extends Collection<SpellPF2e<TActor>> {
    #private;
    readonly entry: TEntry;
    readonly actor: TActor;
    constructor(entry: TEntry);
    get id(): string;
    get highestLevel(): number;
    /**
     * Adds a spell to this spellcasting entry, either moving it from another one if its the same actor,
     * or creating a new spell if its not. If given a level, it will heighten to that level if it can be.
     */
    addSpell(spell: SpellPF2e, options?: {
        slotLevel?: number;
    }): Promise<SpellPF2e<TActor> | null>;
    /** Saves the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, slotLevel: number, spellSlot: number): Promise<TEntry>;
    /** Removes the spell slot and updates the spellcasting entry */
    unprepareSpell(slotLevel: number, spellSlot: number): Promise<TEntry>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(slotLevel: number, spellSlot: number, isExpended: boolean): Promise<TEntry>;
    getSpellData(): Promise<SpellCollectionData>;
    protected getSpellPrepList(spells: SpellPF2e<TActor>[]): Record<number, SpellPrepEntry[]> | null;
}
interface SpellCollectionData {
    levels: SpellcastingSlotLevel[];
    flexibleAvailable?: {
        value: number;
        max: number;
    } | null;
    spellPrepList: Record<number, SpellPrepEntry[]> | null;
}
export { SpellCollection };
