import { AncestryPF2e } from "@item/ancestry";
import { ABCSheetPF2e } from "@item/abc/sheet";
import { AncestrySheetData } from "../sheet/data-types";
export declare class AncestrySheetPF2e extends ABCSheetPF2e<AncestryPF2e> {
    getData(): Promise<AncestrySheetData>;
}
