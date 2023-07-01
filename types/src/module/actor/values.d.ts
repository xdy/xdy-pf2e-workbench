import { SkillAbbreviation } from "@actor/creature/data.ts";
import { AbilityString, SkillLongForm } from "@actor/types.ts";
declare const ABILITY_ABBREVIATIONS: Set<"str" | "dex" | "con" | "int" | "wis" | "cha">;
declare const CREATURE_ACTOR_TYPES: readonly ["character", "npc", "familiar"];
declare const SAVE_TYPES: readonly ["fortitude", "reflex", "will"];
declare const IMMUNITY_TYPES: Set<"adamantine" | "auditory" | "blinded" | "clumsy" | "confused" | "conjuration" | "controlled" | "curse" | "darkwood" | "dazzled" | "deafened" | "disease" | "doomed" | "drained" | "emotion" | "enchantment" | "energy" | "enfeebled" | "evocation" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "frightened" | "grabbed" | "healing" | "illusion" | "immobilized" | "inhaled" | "light" | "magic" | "mithral" | "necromancy" | "non-magical" | "olfactory" | "orichalcum" | "paralyzed" | "petrified" | "physical" | "polymorph" | "possession" | "prone" | "restrained" | "scrying" | "sickened" | "silver" | "sleep" | "slowed" | "stunned" | "stupefied" | "transmutation" | "trip" | "unconscious" | "visual" | "water" | "acid" | "air" | "bleed" | "bludgeoning" | "chaotic" | "cold" | "earth" | "electricity" | "evil" | "fire" | "force" | "good" | "lawful" | "mental" | "negative" | "piercing" | "poison" | "positive" | "precision" | "slashing" | "sonic" | "cold-iron" | "area-damage" | "critical-hits" | "nonlethal-attacks" | "salt-water" | "unarmed-attacks" | "death-effects" | "fear-effects" | "misfortune-effects" | "object-immunities" | "spell-deflection" | "swarm-attacks" | "swarm-mind">;
declare const WEAKNESS_TYPES: Set<"adamantine" | "darkwood" | "emotion" | "energy" | "glass" | "light" | "magical" | "mithral" | "non-magical" | "orichalcum" | "physical" | "radiation" | "salt" | "silver" | "vorpal" | "warpglass" | "water" | "weapons" | "acid" | "air" | "bleed" | "bludgeoning" | "chaotic" | "cold" | "earth" | "electricity" | "evil" | "fire" | "force" | "good" | "lawful" | "mental" | "metal" | "negative" | "piercing" | "poison" | "positive" | "precision" | "slashing" | "sonic" | "cold-iron" | "area-damage" | "critical-hits" | "ghost-touch" | "nonlethal-attacks" | "salt-water" | "unarmed-attacks" | "weapons-shedding-bright-light" | "arrow-vulnerability" | "axe-vulnerability" | "splash-damage" | "vampire-weaknesses" | "vorpal-fear" | "vulnerable-to-sunlight">;
declare const RESISTANCE_TYPES: Set<"adamantine" | "darkwood" | "energy" | "light" | "magical" | "mithral" | "non-magical" | "nonlethal" | "orichalcum" | "physical" | "plant" | "radiation" | "salt" | "silver" | "vorpal" | "warpglass" | "water" | "weapons" | "acid" | "air" | "bleed" | "bludgeoning" | "chaotic" | "cold" | "earth" | "electricity" | "evil" | "fire" | "force" | "good" | "lawful" | "mental" | "metal" | "negative" | "piercing" | "poison" | "positive" | "precision" | "slashing" | "sonic" | "cold-iron" | "all-damage" | "area-damage" | "critical-hits" | "damage-from-spells" | "ghost-touch" | "nonlethal-attacks" | "protean-anatomy" | "salt-water" | "unarmed-attacks" | "vorpal-adamantine" | "weapons-shedding-bright-light">;
declare const UNAFFECTED_TYPES: Set<"bleed" | "chaotic" | "evil" | "good" | "lawful" | "negative" | "positive">;
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
declare const SKILL_LONG_FORMS: Set<"athletics" | "deception" | "stealth" | "nature" | "crafting" | "acrobatics" | "arcana" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "performance" | "religion" | "society" | "survival" | "thievery">;
declare const SKILL_DICTIONARY_REVERSE: {
    [k: string]: "med" | "acr" | "arc" | "ath" | "cra" | "dec" | "dip" | "itm" | "nat" | "occ" | "prf" | "rel" | "soc" | "ste" | "sur" | "thi";
};
declare const DC_SLUGS: Set<"armor" | "athletics" | "deception" | "fortitude" | "perception" | "reflex" | "stealth" | "will" | "nature" | "crafting" | "acrobatics" | "arcana" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "performance" | "religion" | "society" | "survival" | "thievery" | "ac">;
interface SkillExpanded {
    ability: AbilityString;
    shortForm: SkillAbbreviation;
}
declare const SKILL_EXPANDED: Record<SkillLongForm, SkillExpanded>;
declare const MOVEMENT_TYPES: readonly ["land", "burrow", "climb", "fly", "swim"];
declare const ANIMAL_COMPANION_SOURCE_IDS: string[];
declare const CONSTRUCT_COMPANION_SOURCE_IDS: string[];
export { ABILITY_ABBREVIATIONS, ANIMAL_COMPANION_SOURCE_IDS, CONSTRUCT_COMPANION_SOURCE_IDS, CREATURE_ACTOR_TYPES, DC_SLUGS, IMMUNITY_TYPES, MOVEMENT_TYPES, RESISTANCE_TYPES, SAVE_TYPES, SKILL_ABBREVIATIONS, SKILL_DICTIONARY, SKILL_DICTIONARY_REVERSE, SKILL_EXPANDED, SKILL_LONG_FORMS, UNAFFECTED_TYPES, WEAKNESS_TYPES, };
