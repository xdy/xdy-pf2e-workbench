declare const PHYSICAL_ITEM_TYPES: Set<"armor" | "backpack" | "book" | "consumable" | "equipment" | "treasure" | "weapon">;
declare const PRECIOUS_MATERIAL_TYPES: Set<"abysium" | "adamantine" | "coldIron" | "darkwood" | "djezet" | "dragonhide" | "grisantian-pelt" | "inubrix" | "mithral" | "noqual" | "orichalcum" | "peachwood" | "siccatite" | "silver" | "sovereignSteel" | "warpglass">;
declare const PRECIOUS_MATERIAL_GRADES: Set<"high" | "low" | "standard">;
declare const DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
export { DENOMINATIONS, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES };
