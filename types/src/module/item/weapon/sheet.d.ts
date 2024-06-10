/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { MaterialSheetData, PhysicalItemSheetData, PhysicalItemSheetPF2e, RUNE_DATA } from "@item/physical/index.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { ComboWeaponMeleeUsage, SpecificWeaponData } from "./data.ts";
import type { WeaponPF2e } from "./document.ts";
export declare class WeaponSheetPF2e extends PhysicalItemSheetPF2e<WeaponPF2e> {
    protected get validTraits(): Record<string, string>;
    getData(options?: Partial<ItemSheetOptions>): Promise<WeaponSheetData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface PropertyRuneSheetSlot {
    slug: string | null;
    label: string | null;
    disabled: boolean;
}
interface WeaponSheetData extends PhysicalItemSheetData<WeaponPF2e> {
    abpEnabled: boolean;
    adjustedDiceHint: string | null;
    adjustedLevelHint: string | null;
    adjustedPriceHint: string | null;
    baseTypes: typeof CONFIG.PF2E.baseWeaponTypes;
    categories: typeof CONFIG.PF2E.weaponCategories;
    conditionTypes: typeof CONFIG.PF2E.conditionTypes;
    damageDice: typeof CONFIG.PF2E.damageDice;
    damageDie: typeof CONFIG.PF2E.damageDie;
    damageDieFaces: Record<string, string>;
    damageTypes: typeof CONFIG.PF2E.damageTypes;
    groups: typeof CONFIG.PF2E.weaponGroups;
    isBomb: boolean;
    isComboWeapon: boolean;
    itemBonuses: typeof CONFIG.PF2E.itemBonuses;
    mandatoryMelee: boolean;
    mandatoryRanged: boolean;
    meleeGroups: typeof CONFIG.PF2E.meleeWeaponGroups;
    meleeUsage: ComboWeaponMeleeUsage | undefined;
    meleeUsageBaseDamage: FormSelectOption[];
    meleeUsageTraits: SheetOptions;
    otherTags: SheetOptions;
    preciousMaterials: MaterialSheetData;
    propertyRuneSlots: PropertyRuneSheetSlot[];
    runeTypes: typeof RUNE_DATA.weapon;
    specificMagicData: SpecificWeaponData;
    weaponMAP: typeof CONFIG.PF2E.weaponMAP;
    weaponRanges: Record<number, string>;
    weaponReload: typeof CONFIG.PF2E.weaponReload;
}
export {};
