import { SkillAbbreviation } from "@actor/creature/data.ts";
import { AttributeString, SkillLongForm } from "@actor/types.ts";
declare const ATTRIBUTE_ABBREVIATIONS: Set<"str" | "dex" | "con" | "int" | "wis" | "cha">;
declare const CREATURE_ACTOR_TYPES: readonly ["character", "npc", "familiar"];
declare const SAVE_TYPES: readonly ["fortitude", "reflex", "will"];
declare const IMMUNITY_TYPES: Set<"conjuration" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "abysium" | "adamantine" | "auditory" | "blinded" | "clumsy" | "confused" | "controlled" | "curse" | "darkwood" | "dazzled" | "deafened" | "disease" | "djezet" | "doomed" | "drained" | "emotion" | "energy" | "enfeebled" | "fascinated" | "fatigued" | "fleeing" | "frightened" | "grabbed" | "healing" | "immobilized" | "inhaled" | "inubrix" | "light" | "magic" | "metal" | "mithral" | "non-magical" | "noqual" | "off-guard" | "olfactory" | "orichalcum" | "paralyzed" | "petrified" | "physical" | "plant" | "polymorph" | "possession" | "prone" | "radiation" | "restrained" | "scrying" | "siccatite" | "sickened" | "silver" | "sleep" | "slowed" | "stunned" | "stupefied" | "trip" | "unconscious" | "visual" | "water" | "wood" | "wounded" | "acid" | "air" | "bleed" | "bludgeoning" | "chaotic" | "cold" | "earth" | "electricity" | "evil" | "fire" | "force" | "good" | "lawful" | "mental" | "piercing" | "poison" | "precision" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "cold-iron" | "persistent-damage" | "area-damage" | "critical-hits" | "custom" | "nonlethal-attacks" | "salt-water" | "unarmed-attacks" | "death-effects" | "fear-effects" | "misfortune-effects" | "object-immunities" | "spell-deflection" | "swarm-attacks" | "swarm-mind">;
declare const WEAKNESS_TYPES: Set<"abysium" | "adamantine" | "darkwood" | "djezet" | "emotion" | "energy" | "glass" | "inubrix" | "light" | "magical" | "metal" | "mithral" | "non-magical" | "noqual" | "orichalcum" | "physical" | "plant" | "radiation" | "salt" | "siccatite" | "silver" | "spells" | "vorpal" | "water" | "weapons" | "wood" | "acid" | "air" | "bleed" | "bludgeoning" | "chaotic" | "cold" | "earth" | "electricity" | "evil" | "fire" | "force" | "good" | "lawful" | "mental" | "piercing" | "poison" | "precision" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "cold-iron" | "area-damage" | "critical-hits" | "custom" | "ghost-touch" | "nonlethal-attacks" | "salt-water" | "unarmed-attacks" | "weapons-shedding-bright-light" | "arrow-vulnerability" | "axe-vulnerability" | "splash-damage" | "vampire-weaknesses" | "vorpal-fear" | "vulnerable-to-sunlight">;
declare const RESISTANCE_TYPES: Set<"abysium" | "adamantine" | "darkwood" | "djezet" | "energy" | "inubrix" | "light" | "magical" | "metal" | "mithral" | "non-magical" | "nonlethal" | "noqual" | "orichalcum" | "physical" | "plant" | "radiation" | "salt" | "siccatite" | "silver" | "spells" | "vorpal" | "water" | "weapons" | "wood" | "acid" | "air" | "bleed" | "bludgeoning" | "chaotic" | "cold" | "earth" | "electricity" | "evil" | "fire" | "force" | "good" | "lawful" | "mental" | "piercing" | "poison" | "precision" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "cold-iron" | "all-damage" | "area-damage" | "critical-hits" | "custom" | "damage-from-spells" | "ghost-touch" | "nonlethal-attacks" | "protean-anatomy" | "salt-water" | "unarmed-attacks" | "vorpal-adamantine" | "weapons-shedding-bright-light">;
declare const UNAFFECTED_TYPES: Set<"bleed" | "chaotic" | "evil" | "good" | "lawful" | "spirit" | "vitality" | "void">;
declare const SKILL_ABBREVIATIONS: Set<"med" | "acr" | "arc" | "ath" | "cra" | "dec" | "dip" | "itm" | "nat" | "occ" | "prf" | "rel" | "soc" | "ste" | "sur" | "thi">;
declare const SKILL_DICTIONARY: {
    readonly acr: "acrobatics";
    readonly arc: "arcana";
    readonly ath: "athletics";
    readonly cra: "crafting";
    readonly dec: "deception";
    readonly dip: "diplomacy";
    readonly itm: "intimidation";
    readonly med: "medicine";
    readonly nat: "nature";
    readonly occ: "occultism";
    readonly prf: "performance";
    readonly rel: "religion";
    readonly soc: "society";
    readonly ste: "stealth";
    readonly sur: "survival";
    readonly thi: "thievery";
};
declare const SKILL_LONG_FORMS: Set<"athletics" | "deception" | "stealth" | "nature" | "acrobatics" | "arcana" | "crafting" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "performance" | "religion" | "society" | "survival" | "thievery">;
declare const SKILL_DICTIONARY_REVERSE: {
    [k: string]: "med" | "acr" | "arc" | "ath" | "cra" | "dec" | "dip" | "itm" | "nat" | "occ" | "prf" | "rel" | "soc" | "ste" | "sur" | "thi";
};
declare const DC_SLUGS: Set<"armor" | "athletics" | "deception" | "fortitude" | "perception" | "reflex" | "stealth" | "will" | "nature" | "acrobatics" | "arcana" | "crafting" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "performance" | "religion" | "society" | "survival" | "thievery" | "ac">;
interface SkillExpanded {
    attribute: AttributeString;
    shortForm: SkillAbbreviation;
}
declare const SKILL_EXPANDED: Record<SkillLongForm, SkillExpanded>;
declare const MOVEMENT_TYPES: readonly ["land", "burrow", "climb", "fly", "swim"];
/** Actor types that are valid for token size linking */
declare const SIZE_LINKABLE_ACTOR_TYPES: Set<string>;
export { ATTRIBUTE_ABBREVIATIONS, CREATURE_ACTOR_TYPES, DC_SLUGS, IMMUNITY_TYPES, MOVEMENT_TYPES, RESISTANCE_TYPES, SAVE_TYPES, SIZE_LINKABLE_ACTOR_TYPES, SKILL_ABBREVIATIONS, SKILL_DICTIONARY, SKILL_DICTIONARY_REVERSE, SKILL_EXPANDED, SKILL_LONG_FORMS, UNAFFECTED_TYPES, WEAKNESS_TYPES, };
