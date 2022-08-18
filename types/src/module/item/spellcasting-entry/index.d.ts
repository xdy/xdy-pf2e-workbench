import { AbilityString } from "@actor/types";
import { ItemPF2e, SpellPF2e } from "@item";
import { MagicTradition } from "@item/spell/types";
import { OneToFour } from "@module/data";
import { UserPF2e } from "@module/user";
import { Statistic } from "@system/statistic";
import { SpellCollection } from "./collection";
import { SpellcastingEntry, SpellcastingEntryData, SpellcastingEntryListData } from "./data";
declare class SpellcastingEntryPF2e extends ItemPF2e implements SpellcastingEntry {
    spells: SpellCollection;
    /** Spellcasting attack and dc data created during actor preparation */
    statistic: Statistic;
    get ability(): AbilityString;
    /** This entry's magic tradition, defaulting to arcane if unset or invalid */
    get tradition(): MagicTradition;
    /**
     * Returns the proficiency used for calculations.
     * For innate spells, this is the highest spell proficiency (min trained)
     */
    get rank(): OneToFour;
    get isPrepared(): boolean;
    get isFlexible(): boolean;
    get isSpontaneous(): boolean;
    get isInnate(): boolean;
    get isFocusPool(): boolean;
    get isRitual(): boolean;
    get highestLevel(): number;
    prepareBaseData(): void;
    prepareSiblingData(): void;
    prepareActorData(this: Embedded<SpellcastingEntryPF2e>): void;
    /** Returns if the spell is valid to cast by this spellcasting entry */
    canCastSpell(spell: SpellPF2e): boolean;
    /** Casts the given spell as if it was part of this spellcasting entry */
    cast(spell: Embedded<SpellPF2e>, options?: {
        slot?: number;
        level?: number;
        consume?: boolean;
        message?: boolean;
    }): Promise<void>;
    consume(spell: SpellPF2e, level: number, slot?: number): Promise<boolean>;
    /**
     * Adds a spell to this spellcasting entry, either moving it from another one if its the same actor,
     * or creating a new spell if its not.
     */
    addSpell(spell: SpellPF2e, options?: {
        slotLevel?: number;
    }): Promise<SpellPF2e | null>;
    /** Saves the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, slotLevel: number, spellSlot: number): Promise<SpellcastingEntryPF2e>;
    /** Removes the spell slot and updates the spellcasting entry */
    unprepareSpell(spellLevel: number, slotLevel: number): Promise<SpellcastingEntryPF2e>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(slotLevel: number, spellSlot: number, isExpended: boolean): Promise<SpellcastingEntryPF2e>;
    /** Returns rendering data to display the spellcasting entry in the sheet */
    getSpellData(): Promise<SpellcastingEntryListData>;
    private getSpellPrepList;
    getRollOptions(prefix?: string): string[];
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface SpellcastingEntryPF2e {
    readonly data: SpellcastingEntryData;
}
export { SpellcastingEntryPF2e };
