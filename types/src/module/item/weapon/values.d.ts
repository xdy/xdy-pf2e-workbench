declare const WEAPON_CATEGORIES: Set<"advanced" | "simple" | "unarmed" | "martial">;
declare const MELEE_WEAPON_GROUPS: Set<"axe" | "dart" | "knife" | "brawling" | "club" | "flail" | "hammer" | "pick" | "polearm" | "shield" | "spear" | "sword">;
/** Groups that will be forced as ranged weapons */
declare const MANDATORY_RANGED_GROUPS: Set<"bomb" | "bow" | "firearm" | "sling">;
declare const WEAPON_GROUPS: Set<"axe" | "dart" | "knife" | "brawling" | "club" | "flail" | "hammer" | "pick" | "polearm" | "shield" | "spear" | "sword" | "bomb" | "bow" | "firearm" | "sling">;
/** Precious materials that provide effects to strike attack or damage rolls */
declare const WEAPON_MATERIAL_EFFECTS: Set<"adamantine" | "mithral" | "silver" | "abysium" | "coldIron" | "djezet" | "noqual" | "peachwood" | "sovereignSteel">;
declare const WEAPON_PROPERTY_RUNE_TYPES: Set<"ghostTouch" | "vorpal" | "anarchic" | "ancestralEchoing" | "anchoring" | "axiomatic" | "bane" | "bloodbane" | "bloodthirsty" | "brilliant" | "conducting" | "corrosive" | "crushing" | "cunning" | "dancing" | "disrupting" | "energizing" | "extending" | "fanged" | "fearsome" | "flaming" | "frost" | "greaterAnchoring" | "greaterBloodbane" | "greaterBrilliant" | "greaterCorrosive" | "greaterCrushing" | "greaterDisrupting" | "greaterExtending" | "greaterFanged" | "greaterFearsome" | "greaterFlaming" | "greaterFrost" | "greaterHauling" | "greaterImpactful" | "greaterShock" | "greaterThundering" | "grievous" | "hauling" | "holy" | "hopeful" | "impactful" | "keen" | "kinWarding" | "majorFanged" | "pacifying" | "returning" | "serrating" | "shifting" | "shock" | "speed" | "spellStoring" | "thundering" | "unholy" | "wounding">;
declare const THROWN_RANGES: Set<10 | 15 | 20 | 40 | 30 | 100 | 60 | 80>;
declare const WEAPON_RANGES: Set<10 | 15 | 20 | 40 | 30 | 50 | 100 | 60 | 80 | 70 | 90 | 120 | 140 | 150 | 180 | 240 | 300>;
declare const CROSSBOW_WEAPONS: Set<"alchemical-crossbow" | "crossbow" | "hand-crossbow" | "heavy-crossbow" | "repeating-crossbow" | "repeating-hand-crossbow" | "repeating-heavy-crossbow" | "taw-launcher">;
export { CROSSBOW_WEAPONS, MELEE_WEAPON_GROUPS, MANDATORY_RANGED_GROUPS, THROWN_RANGES, WEAPON_CATEGORIES, WEAPON_GROUPS, WEAPON_MATERIAL_EFFECTS, WEAPON_PROPERTY_RUNE_TYPES, WEAPON_RANGES, };
