import { DamageCategory, DamageType } from "./types";
declare const PHYSICAL_DAMAGE_TYPES: readonly ["bludgeoning", "piercing", "slashing", "bleed"];
declare const ENERGY_DAMAGE_TYPES: readonly ["acid", "cold", "electricity", "fire", "sonic", "force", "positive", "negative"];
declare const ALIGNMENT_DAMAGE_TYPES: readonly ["chaotic", "lawful", "good", "evil"];
/** A set of mutually exclusive damage categories */
declare const DAMAGE_CATEGORIES_UNIQUE: Set<"persistent" | "precision" | "splash">;
/** All damage modifications that only affect IWR (like materials) */
declare const MATERIAL_DAMAGE_EFFECTS: Set<"adamantine" | "cold-iron" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass">;
declare const DAMAGE_CATEGORIES: Set<"persistent" | "adamantine" | "cold-iron" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "precision" | "splash" | "energy" | "physical" | "alignment">;
/** The standard damage die sizes */
declare const DAMAGE_DIE_FACES_TUPLE: readonly ["d4", "d6", "d8", "d10", "d12"];
declare const DAMAGE_DIE_FACES: Set<"d10" | "d12" | "d4" | "d6" | "d8">;
declare const DAMAGE_TYPES: Set<"force" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped">;
/** Maps damage types to their damage category; these are the immutable base mappings used if there is no override. */
declare const BASE_DAMAGE_TYPES_TO_CATEGORIES: Record<string, DamageCategory>;
declare const DAMAGE_TYPE_ICONS: Record<DamageType, string | null>;
/** Image map for conditions, currently placed here until we get a new set */
declare const PERSISTENT_DAMAGE_IMAGES: Partial<Record<DamageType, ImageFilePath>>;
/** Whether and how damage should be included on a critical hit */
declare const CRITICAL_INCLUSION: {
    DOUBLE_ON_CRIT: null;
    CRITICAL_ONLY: boolean;
    DONT_DOUBLE_ON_CRIT: boolean;
};
export { ALIGNMENT_DAMAGE_TYPES, BASE_DAMAGE_TYPES_TO_CATEGORIES, CRITICAL_INCLUSION, DAMAGE_CATEGORIES, DAMAGE_CATEGORIES_UNIQUE, DAMAGE_DIE_FACES, DAMAGE_DIE_FACES_TUPLE, DAMAGE_TYPES, DAMAGE_TYPE_ICONS, ENERGY_DAMAGE_TYPES, MATERIAL_DAMAGE_EFFECTS, PERSISTENT_DAMAGE_IMAGES, PHYSICAL_DAMAGE_TYPES, };
