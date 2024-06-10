import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import type { ClassPF2e } from "@item/class/document.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { ABCSheetData, ABCSheetPF2e } from "../abc/sheet.ts";
export declare class ClassSheetPF2e extends ABCSheetPF2e<ClassPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ClassSheetData>;
}
interface ClassSheetData extends ABCSheetData<ClassPF2e> {
    proficiencyChoices: typeof CONFIG.PF2E.proficiencyLevels;
    selectedKeyAbility: Record<string, string>;
    trainedSkills: SheetOptions;
    ancestryFeatLevels: SheetOptions;
    classFeatLevels: SheetOptions;
    generalFeatLevels: SheetOptions;
    skillFeatLevels: SheetOptions;
    skillIncreaseLevels: SheetOptions;
}
export {};
