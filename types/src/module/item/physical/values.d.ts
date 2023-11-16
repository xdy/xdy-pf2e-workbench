declare const PHYSICAL_ITEM_TYPES: Set<"armor" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon">;
declare const BULK_VALUES: readonly ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "L"];
declare const PRECIOUS_MATERIAL_TYPES: Set<"abysium" | "adamantine" | "darkwood" | "djezet" | "inubrix" | "mithral" | "noqual" | "orichalcum" | "siccatite" | "silver" | "cold-iron" | "dragonhide" | "grisantian-pelt" | "keep-stone" | "peachwood" | "sisterstone" | "sisterstone-dusk" | "sisterstone-scarlet" | "sovereign-steel" | "warpglass">;
declare const PRECIOUS_MATERIAL_GRADES: Set<"low" | "standard" | "high">;
declare const DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
export { BULK_VALUES, DENOMINATIONS, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES };
