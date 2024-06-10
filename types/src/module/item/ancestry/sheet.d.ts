import { ABCSheetData, ABCSheetPF2e } from "@item/abc/sheet.ts";
import type { AncestryPF2e } from "@item/ancestry/index.ts";
import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
declare class AncestrySheetPF2e extends ABCSheetPF2e<AncestryPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<AncestrySheetData>;
}
interface AncestrySheetData extends ABCSheetData<AncestryPF2e> {
    selectedBoosts: Record<string, Record<string, string>>;
    selectedFlaws: Record<string, Record<string, string>>;
    sizes: SheetOptions;
    languages: SheetOptions;
    additionalLanguages: SheetOptions;
    visionTypeOptions: FormSelectOption[];
}
export { AncestrySheetPF2e };
