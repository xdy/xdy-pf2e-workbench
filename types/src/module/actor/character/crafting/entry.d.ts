import { ActorPF2e, CharacterPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicatePF2e } from "@system/predication";
import { CraftingFormula } from "./formula";
export declare class CraftingEntry implements Omit<CraftingEntryData, "parentItem"> {
    #private;
    preparedCraftingFormulas: PreparedCraftingFormula[];
    preparedFormulaData: PreparedFormulaData[];
    name: string;
    selector: string;
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    craftableItems: PredicatePF2e;
    maxSlots: number;
    fieldDiscovery?: "bomb" | "elixir" | "mutagen" | "poison";
    batchSize?: number;
    fieldDiscoveryBatchSize?: number;
    maxItemLevel: number;
    parentItem: Embedded<ItemPF2e>;
    constructor(actor: CharacterPF2e, knownFormulas: CraftingFormula[], data: CraftingEntryData);
    get actor(): ActorPF2e;
    get formulas(): (PreparedFormulaSheetData | null)[];
    get reagentCost(): number;
    static isValid(data?: Partial<CraftingEntryData>): data is CraftingEntryData;
    prepareFormula(formula: CraftingFormula): Promise<void>;
    checkEntryRequirements(formula: CraftingFormula, { warn }?: {
        warn?: boolean | undefined;
    }): boolean;
    unprepareFormula(index: number, itemUUID: string): Promise<void>;
    increaseFormulaQuantity(index: number, itemUUID: string): Promise<void>;
    decreaseFormulaQuantity(index: number, itemUUID: string): Promise<void>;
    setFormulaQuantity(index: number, itemUUID: string, quantity: number): Promise<void>;
    toggleFormulaExpended(index: number, itemUUID: string): Promise<void>;
    toggleSignatureItem(itemUUID: string): Promise<void>;
}
export interface CraftingEntryData {
    selector: string;
    name: string;
    parentItem: string;
    isAlchemical?: boolean;
    isDailyPrep?: boolean;
    isPrepared?: boolean;
    maxSlots?: number;
    craftableItems: PredicatePF2e;
    fieldDiscovery?: "bomb" | "elixir" | "mutagen" | "poison";
    batchSize?: number;
    fieldDiscoveryBatchSize?: number;
    maxItemLevel?: number;
    preparedFormulaData?: PreparedFormulaData[];
}
interface PreparedFormulaData {
    itemUUID: string;
    quantity?: number;
    expended?: boolean;
    isSignatureItem?: boolean;
}
interface PreparedCraftingFormula extends CraftingFormula {
    quantity: number;
    expended: boolean;
    isSignatureItem: boolean;
}
interface PreparedFormulaSheetData {
    uuid: string;
    expended: boolean;
    img: ImageFilePath;
    name: string;
    quantity: number;
    isSignatureItem: boolean;
}
export {};
