import type { CharacterPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import { PredicatePF2e, RawPredicate } from "@system/predication.ts";
import { CraftingFormula } from "./formula.ts";
declare class CraftingEntry implements CraftingEntryData {
    #private;
    /** A label for this crafting entry to display on sheets */
    name: string;
    selector: string;
    /** This crafting entry's parent item */
    parent: ItemPF2e<CharacterPF2e>;
    /** All formulas relevant to this crafting known by the grandparent actor */
    knownFormulas: CraftingFormula[];
    preparedCraftingFormulas: PreparedCraftingFormula[];
    preparedFormulaData: PreparedFormulaData[];
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    craftableItems: PredicatePF2e;
    maxSlots: number;
    fieldDiscovery: PredicatePF2e | null;
    batchSizes: {
        default: number;
        other: {
            definition: PredicatePF2e;
            quantity: number;
        }[];
    };
    fieldDiscoveryBatchSize: number;
    maxItemLevel: number;
    constructor(knownFormulas: CraftingFormula[], data: CraftingEntryData);
    get item(): ItemPF2e<CharacterPF2e>;
    get actor(): CharacterPF2e;
    get formulas(): (PreparedFormulaSheetData | null)[];
    get reagentCost(): number;
    static isValid(data: Maybe<Partial<CraftingEntryData>>): data is CraftingEntryData;
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
interface CraftingEntryData {
    selector: string;
    name: string;
    item: ItemPF2e<CharacterPF2e>;
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
    maxItemLevel: number;
    preparedFormulaData?: PreparedFormulaData[];
}
interface PreparedFormulaData {
    itemUUID: string;
    quantity?: number;
    expended?: boolean;
    isSignatureItem?: boolean;
    sort?: number;
}
interface PreparedCraftingFormula extends CraftingFormula {
    quantity: number;
    expended: boolean;
    isSignatureItem: boolean;
    sort: number;
}
interface PreparedFormulaSheetData {
    uuid: string;
    expended: boolean;
    img: ImageFilePath;
    name: string;
    quantity: number;
    isSignatureItem: boolean;
}
export { CraftingEntry };
export type { CraftingEntryData, PreparedFormulaData };
