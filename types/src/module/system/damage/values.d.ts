import { DamageCategory } from "./types";
declare const PHYSICAL_DAMAGE_TYPES: readonly ["bludgeoning", "piercing", "slashing", "bleed"];
declare const ENERGY_DAMAGE_TYPES: readonly ["acid", "cold", "electricity", "fire", "sonic", "force", "positive", "negative"];
declare const ALIGNMENT_DAMAGE_TYPES: readonly ["chaotic", "lawful", "good", "evil"];
declare const DAMAGE_CATEGORIES: Set<"adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "ghostTouch" | "alignment" | "coldiron" | "energy" | "physical" | "precision" | "salt" | "salt-water">;
/** The standard damage die sizes */
declare const DAMAGE_DIE_FACES_TUPLE: readonly ["d4", "d6", "d8", "d10", "d12"];
declare const DAMAGE_DIE_FACES: Set<"d10" | "d12" | "d4" | "d6" | "d8">;
declare const DAMAGE_TYPES: Set<"force" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped">;
/** Maps damage types to their damage category; these are the immutable base mappings used if there is no override. */
declare const BASE_DAMAGE_TYPES_TO_CATEGORIES: Readonly<Record<string, DamageCategory>>;
export { ALIGNMENT_DAMAGE_TYPES, BASE_DAMAGE_TYPES_TO_CATEGORIES, DAMAGE_CATEGORIES, DAMAGE_DIE_FACES, DAMAGE_DIE_FACES_TUPLE, DAMAGE_TYPES, ENERGY_DAMAGE_TYPES, PHYSICAL_DAMAGE_TYPES, };
