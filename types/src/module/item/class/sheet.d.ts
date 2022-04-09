import { ClassPF2e } from "@item/class";
import { ABCSheetPF2e } from "../abc/sheet";
import { ClassSheetData } from "../sheet/data-types";
export declare class ClassSheetPF2e extends ABCSheetPF2e<ClassPF2e> {
    getData(): Promise<ClassSheetData>;
}
