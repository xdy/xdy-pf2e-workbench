import { ABCSheetPF2e } from "../abc/sheet";
import { BackgroundPF2e } from "@item/background";
import { BackgroundSheetData } from "../sheet/data-types";
export declare class BackgroundSheetPF2e extends ABCSheetPF2e<BackgroundPF2e> {
    getData(): Promise<BackgroundSheetData>;
}
