import type { Language } from "@actor/creature/index.ts";
import { AttributeString } from "@actor/types.ts";
import { BaseArmorType } from "@item/armor/types.ts";
import type { BaseWeaponType } from "@item/weapon/types.ts";
import type { SetField, StringField } from "types/foundry/common/data/fields.d.ts";
import type { MenuTemplateData } from "../menu.ts";

declare const HOMEBREW_ELEMENT_KEYS: readonly ["languages", "armorGroups", "baseArmors", "weaponCategories", "weaponGroups", "baseWeapons", "creatureTraits", "featTraits", "spellTraits", "weaponTraits", "shieldTraits", "equipmentTraits"];
/** Homebrew elements from some of the above records are propagated to related records */
declare const TRAIT_PROPAGATIONS: {
    readonly actionTraits: readonly ["effectTraits"];
    readonly creatureTraits: readonly ["ancestryTraits", "hazardTraits"];
    readonly equipmentTraits: readonly ["armorTraits", "consumableTraits"];
    readonly featTraits: readonly ["actionTraits"];
    readonly weaponTraits: readonly ["npcAttackTraits"];
};
type HomebrewTraitKey = (typeof HOMEBREW_ELEMENT_KEYS)[number];
type HomebrewKey = HomebrewTraitKey | "damageTypes" | "languageRarities";
type HomebrewTraitSettingsKey = `homebrew.${HomebrewTraitKey}`;
interface HomebrewTag<T extends HomebrewTraitKey = HomebrewTraitKey> {
    id: T extends "baseArmors" ? BaseArmorType : T extends "baseWeapons" ? BaseWeaponType : T extends "languages" ? LanguageNotCommon : T extends Exclude<HomebrewTraitKey, "baseArmors" | "baseWeapons" | "languages"> ? keyof (typeof CONFIG.PF2E)[T] : never;
    value: string;
}
type MainDamageCategories = "physical" | "energy";
interface CustomDamageData {
    label: string;
    category?: MainDamageCategories | null;
    icon: string | null;
}
interface HomebrewElementsSheetData extends MenuTemplateData {
    languageRarities: LanguageSettingsSheetData;
    damageCategories: Record<MainDamageCategories, string>;
    customDamageTypes: CustomDamageData[];
}
interface LanguageSettingsSheetData {
    commonLanguage: LanguageNotCommon | null;
    common: {
        slug: LanguageNotCommon;
        label: string;
    }[];
    uncommon: {
        slug: LanguageNotCommon;
        label: string;
    }[];
    rare: {
        slug: LanguageNotCommon;
        label: string;
    }[];
    secret: {
        slug: LanguageNotCommon;
        label: string;
    }[];
}
type LanguageNotCommon = Exclude<Language, "common">;
declare class LanguageSettings extends foundry.abstract.DataModel<null, LanguageSettingsSchema> {
    /** Common-rarity languages: those not classified among the subsequent rarities */
    common: Set<LanguageNotCommon>;
    /** Homebrew languages created by the GM */
    homebrew: Set<LanguageNotCommon>;
    protected _initialize(options?: Record<string, unknown>): void;
    static defineSchema(): LanguageSettingsSchema;
    /** Include common languages in the non-source raw object. */
    toObject(source?: true): this["_source"];
    toObject(source: false): RawLanguageSettings<this>;
    toObject(source?: boolean): this["_source"] | RawLanguageSettings<this>;
    /** Schema-restricting choices removes homebrew languages before they're registered: prune in ready hook instead. */
    onReady(): void;
}
interface LanguageSettings extends foundry.abstract.DataModel<null, LanguageSettingsSchema>, ModelPropsFromSchema<LanguageSettingsSchema> {
}
type LanguageSettingsSchema = {
    /** The "common" tongue of the region, rather than languages of common rarity */
    commonLanguage: StringField<LanguageNotCommon, LanguageNotCommon, true, true, true>;
    /** Languages of uncommon rarity */
    uncommon: LanguageSetField;
    /** Languages of rare rarity */
    rare: LanguageSetField;
    /** "Secret" languages (Wildsong) */
    secret: LanguageSetField;
    /** Languages not available for use on any creature */
    unavailable: LanguageSetField;
};
type LanguageSetField = SetField<StringField<LanguageNotCommon, LanguageNotCommon, true, false, false>, LanguageNotCommon[], Set<LanguageNotCommon>, true, false, true>;
interface ModuleHomebrewData {
    skills: Record<string, {
        label: string;
        attribute: AttributeString;
    }>;
    damageTypes: Record<string, CustomDamageData>;
    traits: Record<HomebrewTraitKey, HomebrewTag[]>;
    traitDescriptions: Record<string, string>;
}
type RawLanguageSettings<TModel extends LanguageSettings = LanguageSettings> = RawObject<TModel> & {
    common: LanguageNotCommon[];
    homebrew: LanguageNotCommon[];
};
export { HOMEBREW_ELEMENT_KEYS, LanguageSettings, TRAIT_PROPAGATIONS };
export type { CustomDamageData, HomebrewElementsSheetData, HomebrewKey, HomebrewTag, HomebrewTraitKey, HomebrewTraitSettingsKey, LanguageNotCommon, LanguageSettingsSheetData, ModuleHomebrewData, };
