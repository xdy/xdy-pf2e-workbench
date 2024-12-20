import type { CharacterPF2e } from "@actor";
import { ResourceData } from "@actor/creature/index.ts";
import { PhysicalItemPF2e } from "@item";
import { PhysicalItemSource } from "@item/base/data/index.ts";
import { Predicate } from "@system/predication.ts";
import type {
    CraftableItemDefinition,
    CraftingAbilityData,
    CraftingFormula,
    PreparedFormula,
    PreparedFormulaData,
} from "./types.ts";

declare class CraftingAbility implements CraftingAbilityData {
    #private;
    /** This crafting ability's parent actor */
    actor: CharacterPF2e;
    slug: string;
    /** A label for this crafting entry to display on sheets */
    label: string;
    resource: string | null;
    preparedFormulaData: PreparedFormulaData[];
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    maxSlots: number;
    fieldDiscovery: Predicate | null;
    fieldDiscoveryBatchSize: number;
    batchSize: number;
    maxItemLevel: number;
    /** All craftable item definitions, sorted from biggest batch to smallest batch size */
    craftableItems: CraftableItemDefinition[];
    constructor(actor: CharacterPF2e);
    /** Initializes this crafting ability with data. Call during actor data preparation. */
    initialize(data: CraftingAbilityData): void;
    getPreparedCraftingFormulas(): Promise<PreparedFormula[]>;
    getSheetData(): Promise<CraftingAbilitySheetData>;
    calculateResourceCost(): Promise<number>;
    /** Returns true if the item can be created by this ability, which requires it to pass predication and be of sufficient level */
    canCraft(item: PhysicalItemPF2e, { warn }?: {
        warn?: boolean | undefined;
    }): boolean;
    prepareFormula(formula: CraftingFormula): Promise<void>;
    unprepareFormula(indexOrUuid: number | ItemUUID): Promise<void>;
    setFormulaQuantity(index: number, value: "increase" | "decrease" | number): Promise<void>;
    toggleFormulaExpended(index: number, value?: boolean): Promise<void>;
    toggleSignatureItem(itemUUID: string): Promise<void>;
    updateFormulas(formulas: PreparedFormulaData[], operation?: Partial<DatabaseUpdateOperation<CharacterPF2e>> | undefined): Promise<void>;
    craft(itemOrUUIDOrIndex: PhysicalItemPF2e | ItemUUID | number, { consume, destination }?: CraftParameters): Promise<PhysicalItemPF2e | null>;
    /** Returns what items should be created by this ability during daily preparation, and what the resource expenditure should be */
    calculateDailyCrafting(): Promise<DailyCraftingResult>;
}
interface CraftingAbilitySheetData {
    slug: string;
    label: string;
    isAlchemical: boolean;
    isPrepared: boolean;
    isDailyPrep: boolean;
    /** This is true if we do not have sufficient slots or resources to craft this ability */
    insufficient: boolean;
    maxSlots: number;
    maxItemLevel: number;
    resource: ResourceData | null;
    resourceCost: number;
    remainingSlots: number;
    prepared: PreparedFormula[];
}
interface DailyCraftingResult {
    items: PreCreate<PhysicalItemSource>[];
    resource: {
        slug: string;
        cost: number;
    } | null;
    /** True if this item is internally insufficient. It does not compare with other crafting abilties */
    insufficient: boolean;
}
interface CraftParameters {
    /** If set to true, will craft by consuming the required resource */
    consume?: boolean;
    destination?: "hand";
}
export { CraftingAbility };
export type { CraftingAbilitySheetData, PreparedFormulaData };
