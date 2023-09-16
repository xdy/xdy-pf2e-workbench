import { Rarity } from "@module/data.ts";
import { PhysicalItemPF2e } from "./document.ts";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types.ts";
interface MaterialGradeData {
    level: number;
    price: number;
    rarity: Rarity;
}
type MaterialValuationData = Partial<Record<PreciousMaterialType | "", Record<PreciousMaterialGrade, MaterialGradeData | null>>>;
declare function getMaterialValuationData(item: PhysicalItemPF2e): MaterialGradeData | null;
declare const WEAPON_MATERIAL_VALUATION_DATA: MaterialValuationData;
declare const ARMOR_MATERIAL_VALUATION_DATA: MaterialValuationData;
declare const OBJECT_MATERIAL_VALUATION_DATA: MaterialValuationData;
export { ARMOR_MATERIAL_VALUATION_DATA, OBJECT_MATERIAL_VALUATION_DATA, WEAPON_MATERIAL_VALUATION_DATA, getMaterialValuationData, };
export type { MaterialGradeData, MaterialValuationData };
