import { CharacterPF2e } from "@actor";
import { PredicatePF2e } from "@system/predication";
import { CraftingFormula } from "./formula";
export declare class CraftingEntry implements CraftingEntryData {
    private parentActor;
    preparedFormulas: CraftingFormula[];
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
    constructor(parentActor: CharacterPF2e, knownFormulas: CraftingFormula[], data: CraftingEntryData);
    get formulas(): (PreparedFormulaSheetData | null)[];
    get reagentCost(): number;
    static isValid(data?: Partial<CraftingEntry>): data is CraftingEntry;
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
    updateActorEntryFormulas(): Promise<void>;
    tidyUpSlotData(): void;
}
export interface CraftingEntryData {
    selector: string;
    name: string;
    isAlchemical?: boolean;
    isDailyPrep?: boolean;
    isPrepared?: boolean;
    maxSlots?: number;
    craftableItems: PredicatePF2e;
    fieldDiscovery?: "bomb" | "elixir" | "mutagen" | "poison";
    batchSize?: number;
    fieldDiscoveryBatchSize?: number;
    maxItemLevel?: number;
}
interface PreparedFormulaSheetData {
    uuid: string;
    expended: boolean;
    img: string;
    name: string;
    quantity: number;
    isSignatureItem: boolean;
}
export {};
