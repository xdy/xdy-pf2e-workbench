import { SkillAbbreviation } from "@actor/creature/data";
import { AbilityString } from "./base";

export declare const ABILITY_ABBREVIATIONS: readonly ["str", "dex", "con", "int", "wis", "cha"];
export declare const CREATURE_ACTOR_TYPES: readonly ["character", "npc", "familiar"];
export declare const SAVE_TYPES: readonly ["fortitude", "reflex", "will"];
export declare const ALIGNMENT_TRAITS: readonly ["chaotic", "evil", "good", "lawful"];
export declare const CONDITION_SLUGS: Set<"hidden" | "persistent-damage" | "blinded" | "broken" | "clumsy" | "concealed" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "dying" | "encumbered" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "friendly" | "frightened" | "grabbed" | "helpful" | "hostile" | "immobilized" | "indifferent" | "invisible" | "observed" | "paralyzed" | "petrified" | "prone" | "quickened" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "undetected" | "unfriendly" | "unnoticed" | "wounded">;
export declare const IMMUNITY_TYPES: Set<"hidden" | "force" | "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped" | "alignment" | "coldiron" | "energy" | "ghostTouch" | "physical" | "precision" | "salt" | "salt-water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "critical-hits" | "emotion" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "blinded" | "broken" | "clumsy" | "concealed" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "dying" | "encumbered" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "friendly" | "frightened" | "grabbed" | "helpful" | "hostile" | "immobilized" | "indifferent" | "invisible" | "observed" | "paralyzed" | "petrified" | "prone" | "quickened" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "undetected" | "unfriendly" | "unnoticed" | "wounded" | "auditory" | "confusion" | "curse" | "detection" | "death-effects" | "disease" | "fear-effects" | "healing" | "inhaled" | "magic" | "nonmagical-attacks" | "object-immunities" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "spellDeflection" | "swarm-attacks" | "swarm-mind" | "trip" | "visual">;
export declare const WEAKNESS_TYPES: Set<"force" | "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped" | "alignment" | "coldiron" | "energy" | "ghostTouch" | "physical" | "precision" | "salt" | "salt-water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "critical-hits" | "axe" | "emotion" | "splash-damage" | "vampire-weaknesses" | "vorpal-fear" | "vulnerable-to-sunlight">;
export declare const RESISTANCE_TYPES: Set<"all" | "force" | "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped" | "alignment" | "coldiron" | "energy" | "ghostTouch" | "physical" | "precision" | "salt" | "salt-water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "critical-hits" | "protean anatomy">;
export declare const SKILL_ABBREVIATIONS: readonly ["acr", "arc", "ath", "cra", "dec", "dip", "itm", "med", "nat", "occ", "prf", "rel", "soc", "ste", "sur", "thi"];
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
export declare const SKILL_LONG_FORMS: Set<"performance" | "crafting" | "acrobatics" | "arcana" | "athletics" | "deception" | "diplomacy" | "intimidation" | "medicine" | "nature" | "occultism" | "religion" | "society" | "stealth" | "survival" | "thievery">;
export declare const DC_SLUGS: Set<"performance" | "perception" | "crafting" | "fortitude" | "reflex" | "will" | "ac" | "acrobatics" | "arcana" | "athletics" | "deception" | "diplomacy" | "intimidation" | "medicine" | "nature" | "occultism" | "religion" | "society" | "stealth" | "survival" | "thievery">;
interface SkillExpanded {
    ability: AbilityString;
    shortform: SkillAbbreviation;
}
export declare const SKILL_EXPANDED: Record<string, SkillExpanded>;
export declare const SUPPORTED_ROLL_OPTIONS: string[];
export declare const MOVEMENT_TYPES: readonly ["land", "burrow", "climb", "fly", "swim"];
export {};
