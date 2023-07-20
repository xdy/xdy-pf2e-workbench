declare const PHYSICAL_ITEM_TYPES: Set<"armor" | "consumable" | "book" | "backpack" | "equipment" | "treasure" | "weapon">;
declare const PRECIOUS_MATERIAL_TYPES: Set<"adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "abysium" | "cold-iron" | "djezet" | "dragonhide" | "grisantian-pelt" | "inubrix" | "keep-stone" | "noqual" | "peachwood" | "siccatite" | "sisterstone-dusk" | "sisterstone-scarlet" | "sovereign-steel">;
declare const PRECIOUS_MATERIAL_GRADES: Set<"low" | "standard" | "high">;
declare const DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
export { DENOMINATIONS, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES };
