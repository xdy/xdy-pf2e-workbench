import { DEGREE_OF_SUCCESS, DegreeOfSuccessIndex } from "@system/degree-of-success.ts";
import { DamageFormulaData, DamagePartialTerm } from "./types.ts";
/** A compiled formula with its associated breakdown */
interface AssembledFormula {
    formula: string;
    breakdown: string[];
}
/** Convert the damage definition into a final formula, depending on whether the hit is a critical or not. */
declare function createDamageFormula(damage: DamageFormulaData, degree: (typeof DEGREE_OF_SUCCESS)["SUCCESS" | "CRITICAL_SUCCESS"]): AssembledFormula;
declare function createDamageFormula(damage: DamageFormulaData): AssembledFormula;
declare function createDamageFormula(damage: DamageFormulaData, degree: typeof DEGREE_OF_SUCCESS.CRITICAL_FAILURE): null;
declare function createDamageFormula(damage: DamageFormulaData, degree?: DegreeOfSuccessIndex): AssembledFormula | null;
/** Combines damage dice and modifiers into a simplified list of terms */
declare function combinePartialTerms(terms: DamagePartialTerm[]): DamagePartialTerm[];
/** Combines damage dice and modifiers into a single formula, ignoring the damage type and category. */
declare function createSimpleFormula(terms: DamagePartialTerm[], { doubleDice }?: {
    doubleDice?: boolean;
}): string;
/**
 * Given a simple flavor-less formula with only +/- operators, returns a list of damage partial terms.
 * All subtracted terms become negative terms.
 */
declare function parseTermsFromSimpleFormula(formula: string | Roll, options?: {
    rollData: Record<string, unknown>;
}): DamagePartialTerm[];
export { combinePartialTerms, createDamageFormula, createSimpleFormula, parseTermsFromSimpleFormula };
export type { AssembledFormula };
