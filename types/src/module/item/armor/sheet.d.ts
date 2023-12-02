import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { CoinsPF2e, MaterialSheetData, PhysicalItemSheetData, PhysicalItemSheetPF2e, RUNE_DATA } from "@item/physical/index.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import type { ArmorCategory, ArmorGroup, ArmorPF2e, BaseArmorType } from "./index.ts";
declare class ArmorSheetPF2e extends PhysicalItemSheetPF2e<ArmorPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ArmorSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface ArmorSheetData extends PhysicalItemSheetData<ArmorPF2e> {
    categories: Record<ArmorCategory, string>;
    groups: Record<ArmorGroup, string>;
    baseTypes: Record<BaseArmorType, string>;
    preciousMaterials: MaterialSheetData;
    fundamentalRunes: Pick<typeof RUNE_DATA.armor, "potency" | "resilient">;
    propertyRunes: {
        slug: string;
        name: string;
    }[];
    otherTags: SheetOptions;
    basePrice: CoinsPF2e;
}
export { ArmorSheetPF2e };
