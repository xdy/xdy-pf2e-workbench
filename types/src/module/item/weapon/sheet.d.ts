/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { MaterialSheetData, PhysicalItemSheetData, PhysicalItemSheetPF2e, RUNE_DATA } from "@item/physical/index.ts";
import { OneToFour } from "@module/data.ts";
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
    preciousMaterials: MaterialSheetData;
    fundamentalRunes: Pick<typeof RUNE_DATA.weapon, "potency" | "striking">;
    propertyRunes: {
        slug: string;
        name: string;
    }[];
    otherTags: SheetOptions;
    adjustedDiceHint: string | null;
    adjustedLevelHint: string | null;
    adjustedPriceHint: string | null;
    abpEnabled: boolean;
    categories: typeof CONFIG.PF2E.weaponCategories;
    groups: typeof CONFIG.PF2E.weaponGroups;
    baseTypes: typeof CONFIG.PF2E.baseWeaponTypes;
    itemBonuses: typeof CONFIG.PF2E.itemBonuses;
    damageDieFaces: Record<string, string>;
    damageDie: typeof CONFIG.PF2E.damageDie;
    damageDice: typeof CONFIG.PF2E.damageDice;
    conditionTypes: typeof CONFIG.PF2E.conditionTypes;
    damageTypes: typeof CONFIG.PF2E.damageTypes;
    weaponRanges: Record<number, string>;
    mandatoryMelee: boolean;
    mandatoryRanged: boolean;
    weaponReload: typeof CONFIG.PF2E.weaponReload;
    weaponMAP: typeof CONFIG.PF2E.weaponMAP;
    isBomb: boolean;
    isComboWeapon: boolean;
    meleeGroups: typeof CONFIG.PF2E.meleeWeaponGroups;
    meleeUsage: ComboWeaponMeleeUsage | undefined;
    meleeUsageTraits: SheetOptions;
}
export {};
