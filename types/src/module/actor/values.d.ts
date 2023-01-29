import { SkillAbbreviation } from "@actor/creature/data";
import { AbilityString, SkillLongForm } from "@actor/types";
declare const ABILITY_ABBREVIATIONS: Set<"con" | "dex" | "wis" | "str" | "int" | "cha">;
declare const CREATURE_ACTOR_TYPES: readonly ["character", "npc", "familiar"];
declare const SAVE_TYPES: readonly ["fortitude", "reflex", "will"];
declare const CONDITION_SLUGS: Set<"hidden" | "blinded" | "broken" | "clumsy" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "frightened" | "grabbed" | "immobilized" | "paralyzed" | "petrified" | "prone" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "concealed" | "dying" | "encumbered" | "friendly" | "helpful" | "hostile" | "indifferent" | "invisible" | "observed" | "persistent-damage" | "quickened" | "undetected" | "unfriendly" | "unnoticed" | "wounded">;
declare const IMMUNITY_TYPES: Set<"force" | "light" | "adamantine" | "cold-iron" | "darkwood" | "mithral" | "orichalcum" | "silver" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "precision" | "auditory" | "blinded" | "clumsy" | "confused" | "conjuration" | "controlled" | "curse" | "dazzled" | "deafened" | "disease" | "doomed" | "drained" | "emotion" | "enchantment" | "energy" | "enfeebled" | "evocation" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "frightened" | "grabbed" | "healing" | "illusion" | "immobilized" | "inhaled" | "magic" | "necromancy" | "non-magical" | "olfactory" | "paralyzed" | "petrified" | "physical" | "polymorph" | "possession" | "prone" | "restrained" | "scrying" | "sickened" | "sleep" | "slowed" | "stunned" | "stupefied" | "transmutation" | "trip" | "unarmed-attacks" | "unconscious" | "visual" | "water" | "air" | "earth" | "area-damage" | "critical-hits" | "death-effects" | "fear-effects" | "misfortune-effects" | "nonlethal-attacks" | "object-immunities" | "salt-water" | "spell-deflection" | "swarm-attacks" | "swarm-mind">;
declare const WEAKNESS_TYPES: Set<"force" | "light" | "adamantine" | "cold-iron" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "vorpal" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "precision" | "emotion" | "energy" | "magical" | "non-magical" | "physical" | "radiation" | "salt" | "unarmed-attacks" | "water" | "weapons" | "air" | "earth" | "metal" | "area-damage" | "critical-hits" | "nonlethal-attacks" | "salt-water" | "arrow-vulnerability" | "axe-vulnerability" | "ghost-touch" | "splash-damage" | "vampire-weaknesses" | "vorpal-fear" | "vulnerable-to-sunlight" | "weapons-shedding-bright-light">;
declare const RESISTANCE_TYPES: Set<"force" | "light" | "adamantine" | "cold-iron" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "vorpal" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "precision" | "energy" | "magical" | "non-magical" | "nonlethal" | "physical" | "plant" | "radiation" | "salt" | "unarmed-attacks" | "water" | "weapons" | "air" | "earth" | "metal" | "area-damage" | "critical-hits" | "nonlethal-attacks" | "salt-water" | "ghost-touch" | "weapons-shedding-bright-light" | "all-damage" | "protean-anatomy" | "vorpal-adamantine">;
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
declare const SKILL_LONG_FORMS: Set<"performance" | "nature" | "crafting" | "acrobatics" | "arcana" | "athletics" | "deception" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "religion" | "society" | "stealth" | "survival" | "thievery">;
declare const SKILL_DICTIONARY_REVERSE: {
    [k: string]: "med" | "acr" | "arc" | "ath" | "cra" | "dec" | "dip" | "itm" | "nat" | "occ" | "prf" | "rel" | "soc" | "ste" | "sur" | "thi";
};
declare const DC_SLUGS: Set<"performance" | "nature" | "crafting" | "fortitude" | "reflex" | "will" | "acrobatics" | "arcana" | "athletics" | "deception" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "religion" | "society" | "stealth" | "survival" | "thievery" | "ac" | "perception">;
interface SkillExpanded {
    ability: AbilityString;
    shortform: SkillAbbreviation;
}
declare const SKILL_EXPANDED: Record<SkillLongForm, SkillExpanded>;
declare const MOVEMENT_TYPES: readonly ["land", "burrow", "climb", "fly", "swim"];
declare const ANIMAL_COMPANION_SOURCE_ID = "Compendium.pf2e-animal-companions.AC-Ancestries-and-Class.h6Ybhv5URar01WPk";
declare const CONSTRUCT_COMPANION_SOURCE_ID = "Compendium.pf2e-animal-companions.AC-Features.OJePkZgnguu5Z8cA";
export { ABILITY_ABBREVIATIONS, ANIMAL_COMPANION_SOURCE_ID, CONDITION_SLUGS, CONSTRUCT_COMPANION_SOURCE_ID, CREATURE_ACTOR_TYPES, DC_SLUGS, IMMUNITY_TYPES, MOVEMENT_TYPES, RESISTANCE_TYPES, SAVE_TYPES, SKILL_ABBREVIATIONS, SKILL_DICTIONARY, SKILL_DICTIONARY_REVERSE, SKILL_EXPANDED, SKILL_LONG_FORMS, WEAKNESS_TYPES, };
