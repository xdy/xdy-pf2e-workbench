import { MagicTradition, SpellcastingEntry, SpellcastingEntryData, SpellcastingEntryListData } from "./data";
import { SpellPF2e } from "@item/spell";
import { OneToFour } from "@module/data";
import { ItemPF2e } from "../base";
import { UserPF2e } from "@module/user";
import { Statistic } from "@system/statistic";
export declare class SpellcastingEntryPF2e extends ItemPF2e implements SpellcastingEntry {
    static get schema(): typeof SpellcastingEntryData;
    private _spells;
    /** A collection of all spells contained in this entry regardless of organization */
    get spells(): Collection<Embedded<SpellPF2e>>;
    get ability(): "con" | "dex" | "wis" | "str" | "int" | "cha";
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
    /** Spellcasting attack and dc data created during actor preparation */
    statistic: Statistic;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    prepareActorData(this: Embedded<SpellcastingEntryPF2e>): void;
    /** Casts the given spell as if it was part of this spellcasting entry */
    cast(spell: SpellPF2e, options?: {
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
    addSpell(spell: SpellPF2e, targetLevel: number): Promise<SpellPF2e | null>;
    /** Saves the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, spellLevel: number, spellSlot: number): Promise<this>;
    /** Removes the spell slot and updates the spellcasting entry */
    unprepareSpell(spellLevel: number, spellSlot: number): Promise<this>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(spellLevel: number, spellSlot: number, isExpended: boolean): Promise<this>;
    /** Returns rendering data to display the spellcasting entry in the sheet */
    getSpellData(): SpellcastingEntryListData;
    private getSpellPrepList;
    getRollOptions(prefix?: string): string[];
    protected _preUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
export interface SpellcastingEntryPF2e {
    readonly data: SpellcastingEntryData;
}
