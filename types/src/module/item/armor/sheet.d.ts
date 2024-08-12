import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { CoinsPF2e, MaterialSheetData, PhysicalItemSheetData, PhysicalItemSheetPF2e, RUNE_DATA } from "@item/physical/index.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import type { ArmorCategory, ArmorGroup, ArmorPF2e, BaseArmorType, SpecificArmorData } from "./index.ts";
declare class ArmorSheetPF2e extends PhysicalItemSheetPF2e<ArmorPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ArmorSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface ArmorSheetData extends PhysicalItemSheetData<ArmorPF2e> {
    abpEnabled: boolean;
    basePrice: CoinsPF2e;
    baseTypes: Record<BaseArmorType, string>;
    categories: Record<ArmorCategory, string>;
    groups: Record<ArmorGroup, string>;
    otherTags: SheetOptions;
    preciousMaterials: MaterialSheetData;
    propertyRuneSlots: PropertyRuneSheetSlot[];
    runeTypes: typeof RUNE_DATA.armor;
    specificMagicData: SpecificArmorData;
}
interface PropertyRuneSheetSlot {
    slug: string | null;
    label: string | null;
    disabled: boolean;
}
export { ArmorSheetPF2e };
