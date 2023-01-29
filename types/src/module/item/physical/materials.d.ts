import { Rarity } from "@module/data";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types";
interface MaterialGradeData {
    level: number;
    price: number;
    rarity: Rarity;
}
type MaterialValuationData = Partial<Record<PreciousMaterialType | "", Record<PreciousMaterialGrade, MaterialGradeData | null>>>;
declare const WEAPON_MATERIAL_VALUATION_DATA: MaterialValuationData;
declare const ARMOR_MATERIAL_VALUATION_DATA: MaterialValuationData;
export { ARMOR_MATERIAL_VALUATION_DATA, MaterialGradeData, MaterialValuationData, WEAPON_MATERIAL_VALUATION_DATA };
