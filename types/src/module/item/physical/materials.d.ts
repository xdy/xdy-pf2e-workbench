import { Rarity } from "@module/data";
import { PreciousMaterialGrade, PreciousMaterialType } from "./data";
export interface MaterialGradeData {
    level: number;
    price: number;
    rarity: Rarity;
}
export declare type MaterialValuationData = Record<PreciousMaterialType | "", Record<PreciousMaterialGrade, MaterialGradeData | null>>;
export declare const MATERIAL_VALUATION_DATA: MaterialValuationData;
