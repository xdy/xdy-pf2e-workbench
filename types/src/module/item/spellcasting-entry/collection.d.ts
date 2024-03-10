import { ActorPF2e } from "@actor";
import { SpellPF2e } from "@item";
import { OneToTen, ZeroToTen } from "@module/data.ts";
import { BaseSpellcastingEntry, SpellPrepEntry, SpellcastingSlotGroup } from "./types.ts";
declare class SpellCollection<TActor extends ActorPF2e> extends Collection<SpellPF2e<TActor>> {
    #private;
    readonly entry: BaseSpellcastingEntry<TActor>;
    readonly actor: TActor;
    readonly name: string;
    constructor(entry: BaseSpellcastingEntry<TActor>, name?: string);
    get id(): string;
    get highestRank(): OneToTen;
    /**
     * Adds a spell to this spellcasting entry, either moving it from another one if its the same actor,
     * or creating a new spell if its not. If given a rank, it will heighten to that rank if it can be.
     */
    addSpell(spell: SpellPF2e, options?: {
        groupId?: Maybe<SpellSlotGroupId>;
    }): Promise<SpellPF2e<TActor> | null>;
    /** Swap positions of two spells in the same spell collection and slot group */
    swapSlotPositions(groupId: string, slotIndexA: number, slotIndexB: number): Promise<this | null>;
    /** Save the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, groupId: SpellSlotGroupId, slotIndex: number): Promise<this | null>;
    /** Clear the spell slot and updates the spellcasting entry */
    unprepareSpell(groupId: SpellSlotGroupId, slotIndex: number): Promise<this | null>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(groupId: SpellSlotGroupId, slotIndex: number, value: boolean): Promise<this | null>;
    getSpellData({ prepList }?: {
        prepList?: boolean | undefined;
    }): Promise<SpellCollectionData>;
    protected getSpellPrepList(spells: SpellPF2e<TActor>[]): Record<ZeroToTen, SpellPrepEntry[]>;
}
type SpellSlotGroupId = "cantrips" | OneToTen;
interface SpellCollectionData {
    groups: SpellcastingSlotGroup[];
    flexibleAvailable?: {
        value: number;
        max: number;
    } | null;
    prepList: Record<ZeroToTen, SpellPrepEntry[]> | null;
}
export { SpellCollection };
export type { SpellCollectionData, SpellSlotGroupId };
