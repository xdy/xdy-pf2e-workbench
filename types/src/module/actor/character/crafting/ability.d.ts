import type { CharacterPF2e } from "@actor";
import { Predicate, RawPredicate } from "@system/predication.ts";
import { CraftingFormula, PreparedFormula, PreparedFormulaData } from "./types.ts";

declare class CraftingAbility implements CraftingAbilityData {
    #private;
    /** A label for this crafting entry to display on sheets */
    label: string;
    slug: string;
    /** This crafting ability's parent actor */
    actor: CharacterPF2e;
    preparedFormulaData: PreparedFormulaData[];
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    craftableItems: Predicate;
    maxSlots: number;
    fieldDiscovery: Predicate | null;
    batchSizes: {
        default: number;
        other: {
            definition: Predicate;
            quantity: number;
        }[];
    };
    fieldDiscoveryBatchSize: number;
    maxItemLevel: number;
    constructor(actor: CharacterPF2e, data: CraftingAbilityData);
    getPreparedCraftingFormulas(): Promise<PreparedFormula[]>;
    getSheetData(): Promise<CraftingAbilitySheetData>;
    /** Computes reagent cost. Will go away once updated to PC2 */
    calculateReagentCost(): Promise<number>;
    prepareFormula(formula: CraftingFormula): Promise<void>;
    checkEntryRequirements(formula: CraftingFormula, { warn }?: {
        warn?: boolean | undefined;
    }): boolean;
    unprepareFormula(index: number, itemUUID: string): Promise<void>;
    setFormulaQuantity(index: number, itemUUID: string, value: "increase" | "decrease" | number): Promise<void>;
    toggleFormulaExpended(index: number, itemUUID: string): Promise<void>;
    toggleSignatureItem(itemUUID: string): Promise<void>;
    updateFormulas(formulas: PreparedFormulaData[]): Promise<void>;
}
interface CraftingAbilityData {
    slug: string;
    label: string;
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    maxSlots?: number;
    craftableItems: RawPredicate;
    fieldDiscovery?: RawPredicate | null;
    batchSizes?: {
        default: number;
        other: {
            definition: RawPredicate;
            quantity: number;
        }[];
    };
    fieldDiscoveryBatchSize?: number;
    maxItemLevel?: number | null;
    preparedFormulaData?: PreparedFormulaData[];
}
interface CraftingAbilitySheetData {
    slug: string;
    label: string;
    isAlchemical: boolean;
    isPrepared: boolean;
    isDailyPrep: boolean;
    maxSlots: number;
    maxItemLevel: number;
    reagentCost: number;
    prepared: (PreparedFormula | null)[];
}
export { CraftingAbility };
export type { CraftingAbilityData, CraftingAbilitySheetData, PreparedFormulaData };
