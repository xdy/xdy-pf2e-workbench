import { AbilityString } from "@actor/data/base";
import { SpellPF2e } from "@item";
import { ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { MAGIC_TRADITIONS } from "@item/spell/data";
import { OneToFour, OneToTen, ZeroToEleven } from "@module/data";
import { RollNotePF2e } from "@module/notes";
import { Statistic, StatisticChatData } from "@system/statistic";
import { SpellcastingEntryPF2e } from "..";
export interface SpellcastingEntry {
    id: string;
    statistic: Statistic;
    cast(spell: SpellPF2e, options: {}): Promise<void>;
}
export declare type SlotKey = `slot${ZeroToEleven}`;
export declare type SpellcastingEntrySource = BaseNonPhysicalItemSource<"spellcastingEntry", SpellcastingEntrySystemData>;
export declare class SpellcastingEntryData extends BaseNonPhysicalItemData<SpellcastingEntryPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface SpellcastingEntryData extends Omit<SpellcastingEntrySource, "effects" | "flags"> {
    type: SpellcastingEntrySource["type"];
    data: SpellcastingEntrySource["data"];
    readonly _source: SpellcastingEntrySource;
}
export interface SpellAttackRollModifier {
    breakdown: string;
    notes: RollNotePF2e[];
    roll: Function;
    value: number;
}
export interface SpellDifficultyClass {
    breakdown: string;
    notes: RollNotePF2e[];
    value: number;
}
interface SpellPrepData {
    id: string | null;
    expended?: boolean;
    name?: string;
    prepared?: boolean;
}
interface SpellSlotData {
    prepared: Record<number, SpellPrepData>;
    value: number;
    max: number;
}
export declare type MagicTradition = typeof MAGIC_TRADITIONS[number];
export declare type PreparationType = keyof ConfigPF2e["PF2E"]["preparationType"];
export interface SpellcastingEntrySystemData extends ItemSystemData {
    ability: {
        value: AbilityString | "";
    };
    spelldc: {
        value: number;
        dc: number;
        mod: number;
    };
    statisticData?: StatisticChatData;
    tradition: {
        value: MagicTradition | "";
    };
    prepared: {
        value: PreparationType;
        flexible?: boolean;
    };
    showUnpreparedSpells: {
        value: boolean;
    };
    showSlotlessLevels: {
        value: boolean;
    };
    proficiency: {
        value: OneToFour;
    };
    displayLevels: Record<number, boolean>;
    slots: Record<SlotKey, SpellSlotData>;
    autoHeightenLevel: {
        value: OneToTen | null;
    };
}
export {};
