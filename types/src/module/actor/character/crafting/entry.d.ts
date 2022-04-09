import { CharacterPF2e } from "@actor";
import { PhysicalItemTrait } from "@item/physical/data";
import { CraftingFormula } from "./formula";
export declare class CraftingEntry implements CraftingEntryData {
    private parentActor;
    actorPreparedFormulas: ActorPreparedFormula[];
    preparedFormulas: PreparedFormula[];
    name: string;
    selector: string;
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    requiredTraits: PhysicalItemTrait[][];
    maxSlots: number;
    fieldDiscovery?: "bomb" | "elixir" | "mutagen" | "poison";
    batchSize?: number;
    fieldDiscoveryBatchSize?: number;
    maxItemLevel: number;
    constructor(parentActor: CharacterPF2e, knownFormulas: CraftingFormula[], data: CraftingEntryData);
    get formulas(): (PreparedFormula | null)[];
    get formulasByLevel(): {
        [k: string]: PreparedFormula[];
    };
    get reagentCost(): number;
    static isValid(data?: Partial<CraftingEntry>): data is CraftingEntry;
    prepareFormula(formula: CraftingFormula): Promise<void>;
    checkEntryRequirements(formula: CraftingFormula, { warn }?: {
        warn?: boolean | undefined;
    }): boolean;
    unprepareFormula(index: number, itemUUID: string): Promise<void>;
    increaseFormulaQuantity(index: number, itemUUID: string): Promise<void>;
    decreaseFormulaQuantity(index: number, itemUUID: string): Promise<void>;
    toggleFormulaExpended(index: number, itemUUID: string): Promise<void>;
    toggleSignatureItem(index: number, itemUUID: string): Promise<void>;
    updateActorEntryFormulas(): Promise<void>;
}
interface PreparedFormula extends CraftingFormula {
    quantity?: number;
    expended?: boolean;
    isSignatureItem?: boolean;
}
interface ActorPreparedFormula {
    itemUUID: string;
    quantity?: number;
    expended?: boolean;
    isSignatureItem?: boolean;
}
export interface CraftingEntryData {
    actorPreparedFormulas: ActorPreparedFormula[];
    selector: string;
    name: string;
    isAlchemical?: boolean;
    isDailyPrep?: boolean;
    isPrepared?: boolean;
    maxSlots?: number;
    requiredTraits?: PhysicalItemTrait[][];
    fieldDiscovery?: "bomb" | "elixir" | "mutagen" | "poison";
    batchSize?: number;
    fieldDiscoveryBatchSize?: number;
    maxItemLevel?: number;
}
export {};
