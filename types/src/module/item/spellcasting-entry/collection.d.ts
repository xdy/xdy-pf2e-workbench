import { SpellPF2e } from "@item";
import { SpellcastingEntryPF2e } from ".";
import { SpellcastingSlotLevel, SpellPrepEntry } from "./data";
export declare class SpellCollection extends Collection<Embedded<SpellPF2e>> {
    entry: Embedded<SpellcastingEntryPF2e>;
    constructor(entry: Embedded<SpellcastingEntryPF2e>);
    get id(): string;
    get actor(): import("../../actor/base").ActorPF2e;
    get highestLevel(): number;
    /**
     * Adds a spell to this spellcasting entry, either moving it from another one if its the same actor,
     * or creating a new spell if its not. If given a level, it will heighten to that level if it can be.
     */
    addSpell(spell: SpellPF2e, options?: {
        slotLevel?: number;
    }): Promise<SpellPF2e | null>;
    /** Saves the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, slotLevel: number, spellSlot: number): Promise<SpellcastingEntryPF2e>;
    /** Removes the spell slot and updates the spellcasting entry */
    unprepareSpell(slotLevel: number, spellSlot: number): Promise<SpellcastingEntryPF2e>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(slotLevel: number, spellSlot: number, isExpended: boolean): Promise<SpellcastingEntryPF2e>;
    getSpellData(): Promise<{
        levels: SpellcastingSlotLevel[];
        flexibleAvailable: {
            value: number;
            max: number;
        } | undefined;
        spellPrepList: Record<number, SpellPrepEntry[]> | null;
    }>;
    private getSpellPrepList;
}
