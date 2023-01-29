import { CoinsPF2e, PhysicalItemSheetData, PhysicalItemSheetPF2e, PreparedMaterials } from "@item/physical";
import { SheetOptions } from "@module/sheet/helpers";
import { ArmorCategory, ArmorGroup, ArmorPF2e, BaseArmorType } from ".";
declare class ArmorSheetPF2e extends PhysicalItemSheetPF2e<ArmorPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<ArmorSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface ArmorSheetData extends PhysicalItemSheetData<ArmorPF2e> {
    armorPotencyRunes: ConfigPF2e["PF2E"]["armorPotencyRunes"];
    armorResiliencyRunes: ConfigPF2e["PF2E"]["armorResiliencyRunes"];
    armorPropertyRunes: ConfigPF2e["PF2E"]["armorPropertyRunes"];
    categories: Record<ArmorCategory, string>;
    groups: Record<ArmorGroup, string>;
    baseTypes: Record<BaseArmorType, string>;
    bulkTypes: ConfigPF2e["PF2E"]["bulkTypes"];
    preciousMaterials: PreparedMaterials;
    otherTags: SheetOptions;
    basePrice: CoinsPF2e;
}
export { ArmorSheetPF2e };
