export { type BasicConstructorOptions, TagSelectorBasic } from "./basic.ts";
export { SenseSelector } from "./senses.ts";
export { SpeedSelector } from "./speeds.ts";
export type { TagSelectorOptions } from "./base.ts";
declare const TAG_SELECTOR_TYPES: readonly ["basic", "senses", "speed-types"];
type TagSelectorType = (typeof TAG_SELECTOR_TYPES)[number];
declare const SELECTABLE_TAG_FIELDS: readonly ["abilities", "actionCategories", "actionTraits", "actionTypes", "actionsNumber", "actorSizes", "alignments", "ancestryItemTraits", "ancestryTraits", "areaSizes", "areaTypes", "armorGroups", "armorPotencyRunes", "armorPropertyRunes", "armorResiliencyRunes", "armorTraits", "attackEffects", "baseWeaponTypes", "bulkTypes", "classTraits", "conditionTypes", "consumableTraits", "consumableTypes", "creatureTraits", "currencies", "damageCategories", "damageDie", "damageTypes", "dcAdjustments", "equipmentTraits", "featTraits", "hazardTraits", "healingTypes", "itemBonuses", "languages", "levels", "magicTraditions", "materialDamageEffects", "monsterTraits", "npcAttackTraits", "otherArmorTags", "otherConsumableTags", "otherWeaponTags", "preciousMaterialGrades", "preciousMaterials", "preparationType", "prerequisitePlaceholders", "proficiencyLevels", "rarityTraits", "saves", "senses", "skillList", "skills", "speedTypes", "spellComponents", "spellLevels", "spellTraits", "spellTypes", "traitsDescriptions", "vehicleTraits", "weaponCategories", "weaponDamage", "weaponDescriptions", "weaponGroups", "weaponHands", "weaponMAP", "weaponReload", "weaponTraits"];
type SelectableTagField = (typeof SELECTABLE_TAG_FIELDS)[number];
export { SELECTABLE_TAG_FIELDS, SelectableTagField, TAG_SELECTOR_TYPES, TagSelectorType };
