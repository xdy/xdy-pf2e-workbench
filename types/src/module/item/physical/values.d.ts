declare const PHYSICAL_ITEM_TYPES: Set<"armor" | "backpack" | "book" | "consumable" | "equipment" | "treasure" | "weapon">;
declare const PRECIOUS_MATERIAL_TYPES: Set<"abysium" | "adamantine" | "cold-iron" | "darkwood" | "djezet" | "dragonhide" | "grisantian-pelt" | "inubrix" | "mithral" | "noqual" | "orichalcum" | "peachwood" | "siccatite" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "sovereign-steel" | "warpglass">;
declare const PRECIOUS_MATERIAL_GRADES: Set<"high" | "low" | "standard">;
declare const DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
export { DENOMINATIONS, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES };
