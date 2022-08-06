declare const PHYSICAL_ITEM_TYPES: Set<"consumable" | "armor" | "backpack" | "book" | "equipment" | "treasure" | "weapon">;
declare const PRECIOUS_MATERIAL_TYPES: Set<"adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "abysium" | "coldIron" | "djezet" | "dragonhide" | "grisantian-pelt" | "inubrix" | "noqual" | "peachwood" | "siccatite" | "sovereignSteel">;
declare const PRECIOUS_MATERIAL_GRADES: Set<"high" | "low" | "standard">;
declare const DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
export { DENOMINATIONS, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES };
