import type { CharacterPF2e } from "../document.ts";
import { CraftingAbility } from "./ability.ts";
import { CraftingFormula } from "./types.ts";

/** Caches and performs operations on elements related to crafting */
declare class CharacterCrafting {
    #private;
    actor: CharacterPF2e;
    abilities: Collection<CraftingAbility>;
    constructor(actor: CharacterPF2e);
    /**
     * Retrieves all formulas this actor knows including their associated items.
     * The result is cached until next data prep.
     */
    getFormulas(): Promise<CraftingFormula[]>;
    performDailyCrafting(): Promise<void>;
}
export { CharacterCrafting };
