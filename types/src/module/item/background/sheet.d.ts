import { ABCSheetData, ABCSheetPF2e } from "../abc/sheet";
import { BackgroundPF2e } from "@item/background";
import { SheetOptions } from "@module/sheet/helpers";
export declare class BackgroundSheetPF2e extends ABCSheetPF2e<BackgroundPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<BackgroundSheetData>;
}
interface BackgroundSheetData extends ABCSheetData<BackgroundPF2e> {
    trainedSkills: SheetOptions;
    selectedBoosts: Record<string, Record<string, string>>;
}
export {};
