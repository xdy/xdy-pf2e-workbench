/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { CoinsPF2e, PhysicalItemSheetData, PhysicalItemSheetPF2e, PreparedMaterials } from "@item/physical/index.ts";
import { OneToFour, Rarity } from "@module/data.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { ComboWeaponMeleeUsage, WeaponPropertyRuneSlot } from "./data.ts";
import { type WeaponPF2e } from "./document.ts";
export declare class WeaponSheetPF2e extends PhysicalItemSheetPF2e<WeaponPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<WeaponSheetData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface PropertyRuneSheetSlot extends WeaponPropertyRuneSlot {
    name?: string;
    number?: OneToFour;
    label?: string;
}
interface WeaponSheetData extends PhysicalItemSheetData<WeaponPF2e> {
    propertyRuneSlots?: PropertyRuneSheetSlot[];
    preciousMaterials: PreparedMaterials;
    weaponPotencyRunes: ConfigPF2e["PF2E"]["weaponPotencyRunes"];
    weaponStrikingRunes: ConfigPF2e["PF2E"]["weaponStrikingRunes"];
    weaponPropertyRunes: Record<string, string>;
    otherTags: SheetOptions;
    adjustedDiceHint: string | null;
    adjustedLevelHint: string | null;
    adjustedPriceHint: string | null;
    abpEnabled: boolean;
    baseDice: number;
    baseLevel: number;
    rarity: Rarity;
    basePrice: CoinsPF2e;
    categories: ConfigPF2e["PF2E"]["weaponCategories"];
    groups: ConfigPF2e["PF2E"]["weaponGroups"];
    baseTypes: ConfigPF2e["PF2E"]["baseWeaponTypes"];
    itemBonuses: ConfigPF2e["PF2E"]["itemBonuses"];
    damageDieFaces: Record<string, string>;
    damageDie: ConfigPF2e["PF2E"]["damageDie"];
    damageDice: ConfigPF2e["PF2E"]["damageDice"];
    conditionTypes: ConfigPF2e["PF2E"]["conditionTypes"];
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"];
    weaponRanges: Record<number, string>;
    mandatoryMelee: boolean;
    mandatoryRanged: boolean;
    weaponReload: ConfigPF2e["PF2E"]["weaponReload"];
    weaponMAP: ConfigPF2e["PF2E"]["weaponMAP"];
    isBomb: boolean;
    isComboWeapon: boolean;
    meleeGroups: ConfigPF2e["PF2E"]["meleeWeaponGroups"];
    meleeUsage: ComboWeaponMeleeUsage | undefined;
    meleeUsageTraits: SheetOptions;
}
export {};
