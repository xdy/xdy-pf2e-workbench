import { Rarity } from "@module/data";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types";
export interface MaterialGradeData {
    level: number;
    price: number;
    rarity: Rarity;
}
export declare type MaterialValuationData = Partial<Record<PreciousMaterialType | "", Record<PreciousMaterialGrade, MaterialGradeData | null>>>;
export declare const WEAPON_MATERIAL_VALUATION_DATA: MaterialValuationData;
export declare const ARMOR_MATERIAL_VALUATION_DATA: MaterialValuationData;
