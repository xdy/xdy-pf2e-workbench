import { SkillAbbreviation } from "@actor/creature/data";
import { AbilityString, SkillLongForm } from "@actor/types";
export declare const ABILITY_ABBREVIATIONS: Set<"str" | "dex" | "con" | "int" | "wis" | "cha">;
export declare const CREATURE_ACTOR_TYPES: readonly ["character", "npc", "familiar"];
export declare const SAVE_TYPES: readonly ["fortitude", "reflex", "will"];
export declare const CONDITION_SLUGS: Set<"hidden" | "persistent-damage" | "blinded" | "broken" | "clumsy" | "concealed" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "dying" | "encumbered" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "friendly" | "frightened" | "grabbed" | "helpful" | "hostile" | "immobilized" | "indifferent" | "invisible" | "observed" | "paralyzed" | "petrified" | "prone" | "quickened" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "undetected" | "unfriendly" | "unnoticed" | "wounded">;
export declare const IMMUNITY_TYPES: Set<"hidden" | "force" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "positive" | "negative" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "chaotic" | "lawful" | "good" | "evil" | "mental" | "poison" | "untyped" | "adamantine" | "alignment" | "coldiron" | "darkwood" | "energy" | "ghostTouch" | "mithral" | "orichalcum" | "physical" | "precision" | "salt" | "salt-water" | "silver" | "warpglass" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "critical-hits" | "object-immunities" | "blinded" | "broken" | "clumsy" | "concealed" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "dying" | "encumbered" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "friendly" | "frightened" | "grabbed" | "helpful" | "hostile" | "immobilized" | "indifferent" | "invisible" | "observed" | "paralyzed" | "petrified" | "prone" | "quickened" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "undetected" | "unfriendly" | "unnoticed" | "wounded" | "auditory" | "confusion" | "curse" | "detection" | "death-effects" | "disease" | "emotion" | "fear-effects" | "healing" | "inhaled" | "magic" | "nonmagical-attacks" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "spellDeflection" | "swarm-attacks" | "swarm-mind" | "trip" | "visual">;
export declare const WEAKNESS_TYPES: Set<"force" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "positive" | "negative" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "chaotic" | "lawful" | "good" | "evil" | "mental" | "poison" | "untyped" | "adamantine" | "alignment" | "coldiron" | "darkwood" | "energy" | "ghostTouch" | "mithral" | "orichalcum" | "physical" | "precision" | "salt" | "salt-water" | "silver" | "warpglass" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "critical-hits" | "splash-damage" | "emotion" | "axe" | "vampire-weaknesses" | "vorpal-fear" | "vulnerable-to-sunlight">;
export declare const RESISTANCE_TYPES: Set<"all" | "force" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "positive" | "negative" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "chaotic" | "lawful" | "good" | "evil" | "mental" | "poison" | "untyped" | "adamantine" | "alignment" | "coldiron" | "darkwood" | "energy" | "ghostTouch" | "mithral" | "orichalcum" | "physical" | "precision" | "salt" | "salt-water" | "silver" | "warpglass" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "critical-hits" | "protean anatomy">;
export declare const SKILL_ABBREVIATIONS: Set<"acr" | "arc" | "ath" | "cra" | "dec" | "dip" | "itm" | "med" | "nat" | "occ" | "prf" | "rel" | "soc" | "ste" | "sur" | "thi">;
export declare const SKILL_DICTIONARY: {
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
export declare const SKILL_LONG_FORMS: Set<"performance" | "acrobatics" | "arcana" | "athletics" | "crafting" | "deception" | "diplomacy" | "intimidation" | "medicine" | "nature" | "occultism" | "religion" | "society" | "stealth" | "survival" | "thievery">;
export declare const SKILL_DICTIONARY_REVERSE: {
    [k: string]: "acr" | "arc" | "ath" | "cra" | "dec" | "dip" | "itm" | "med" | "nat" | "occ" | "prf" | "rel" | "soc" | "ste" | "sur" | "thi";
};
export declare const DC_SLUGS: Set<"performance" | "fortitude" | "reflex" | "will" | "acrobatics" | "arcana" | "athletics" | "crafting" | "deception" | "diplomacy" | "intimidation" | "medicine" | "nature" | "occultism" | "religion" | "society" | "stealth" | "survival" | "thievery" | "ac" | "perception">;
interface SkillExpanded {
    ability: AbilityString;
    shortform: SkillAbbreviation;
}
export declare const SKILL_EXPANDED: Record<SkillLongForm, SkillExpanded>;
export declare const MOVEMENT_TYPES: readonly ["land", "burrow", "climb", "fly", "swim"];
export {};
