import { DamageCategory, DamageType } from "./types.ts";

declare const PHYSICAL_DAMAGE_TYPES: readonly ["bludgeoning", "piercing", "slashing", "bleed"];
declare const ENERGY_DAMAGE_TYPES: readonly ["acid", "cold", "electricity", "fire", "sonic", "force", "vitality", "void"];
/** A set of mutually exclusive damage categories */
declare const DAMAGE_CATEGORIES_UNIQUE: readonly ["persistent", "precision", "splash"];
/** All damage modifications that only affect IWR (like materials) */
declare const MATERIAL_DAMAGE_EFFECTS: Set<"adamantine" | "dawnsilver" | "duskwood" | "orichalcum" | "silver" | "cold-iron" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass">;
declare const DAMAGE_CATEGORIES: Set<"adamantine" | "dawnsilver" | "duskwood" | "energy" | "orichalcum" | "physical" | "silver" | "precision" | "splash" | "cold-iron" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "persistent">;
/** The standard damage die sizes (number of faces on a die) */
declare const DAMAGE_DIE_SIZES: readonly ["d4", "d6", "d8", "d10", "d12"];
declare const DAMAGE_DICE_FACES: readonly [4, 6, 8, 10, 12];
declare const DAMAGE_TYPES: Set<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped">;
/** Maps damage types to their damage category; these are the immutable base mappings used if there is no override. */
declare const BASE_DAMAGE_TYPES_TO_CATEGORIES: Record<DamageType, DamageCategory | null>;
declare const DAMAGE_TYPE_ICONS: Record<DamageType, string | null>;
/** Image map for conditions, currently placed here until we get a new set */
declare const PERSISTENT_DAMAGE_IMAGES: Partial<Record<DamageType, ImageFilePath>>;
/** Whether and how damage should be included on a critical hit */
declare const CRITICAL_INCLUSION: {
    DOUBLE_ON_CRIT: null;
    CRITICAL_ONLY: boolean;
    DONT_DOUBLE_ON_CRIT: boolean;
};
export { BASE_DAMAGE_TYPES_TO_CATEGORIES, CRITICAL_INCLUSION, DAMAGE_CATEGORIES, DAMAGE_CATEGORIES_UNIQUE, DAMAGE_DICE_FACES, DAMAGE_DIE_SIZES, DAMAGE_TYPES, DAMAGE_TYPE_ICONS, ENERGY_DAMAGE_TYPES, MATERIAL_DAMAGE_EFFECTS, PERSISTENT_DAMAGE_IMAGES, PHYSICAL_DAMAGE_TYPES, };
