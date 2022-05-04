import { PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES } from "./values";
declare type BaseMaterialType = "cloth" | "glass" | "leather" | "paper" | "rope" | "steel" | "stone" | "wood";
declare type BaseMaterialThickness = "thin" | "standard" | "structure";
declare type BaseMaterial = {
    type: BaseMaterialType;
    thickness: BaseMaterialThickness;
};
declare type PreciousMaterialType = SetElement<typeof PRECIOUS_MATERIAL_TYPES>;
declare type PreciousMaterialGrade = SetElement<typeof PRECIOUS_MATERIAL_GRADES>;
export { BaseMaterial, PreciousMaterialType, PreciousMaterialGrade };
