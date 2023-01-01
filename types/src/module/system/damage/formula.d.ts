import { DegreeOfSuccessIndex, DEGREE_OF_SUCCESS } from "@system/degree-of-success";
import { DamageFormulaData } from "./types";
/** Convert the damage definition into a final formula, depending on whether the hit is a critical or not. */
declare function createDamageFormula(damage: DamageFormulaData, degree: typeof DEGREE_OF_SUCCESS["SUCCESS" | "CRITICAL_SUCCESS"]): string;
declare function createDamageFormula(damage: DamageFormulaData): string;
declare function createDamageFormula(damage: DamageFormulaData, degree: typeof DEGREE_OF_SUCCESS.CRITICAL_FAILURE): null;
declare function createDamageFormula(damage: DamageFormulaData, degree?: DegreeOfSuccessIndex): string | null;
export { createDamageFormula };
