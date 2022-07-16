import { ImmunityType } from "@actor/data/base";
import { IWRRuleElement, IWRRuleElementData } from "./base";
/** @category RuleElement */
declare class ImmunityRuleElement extends IWRRuleElement {
    dictionary: Record<"hidden" | "force" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "positive" | "negative" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "chaotic" | "lawful" | "good" | "evil" | "mental" | "poison" | "untyped" | "adamantine" | "alignment" | "coldiron" | "darkwood" | "energy" | "ghostTouch" | "mithral" | "orichalcum" | "physical" | "precision" | "salt" | "salt-water" | "silver" | "warpglass" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "critical-hits" | "object-immunities" | "blinded" | "broken" | "clumsy" | "concealed" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "dying" | "encumbered" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "friendly" | "frightened" | "grabbed" | "helpful" | "hostile" | "immobilized" | "indifferent" | "invisible" | "observed" | "paralyzed" | "petrified" | "prone" | "quickened" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "undetected" | "unfriendly" | "unnoticed" | "wounded" | "auditory" | "confusion" | "curse" | "detection" | "death-effects" | "disease" | "emotion" | "fear-effects" | "healing" | "inhaled" | "magic" | "nonmagical-attacks" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "spellDeflection" | "swarm-attacks" | "swarm-mind" | "trip" | "visual", string>;
    get property(): ImmunityType[];
    validate(): boolean;
    getIWR(): ImmunityType;
}
interface ImmunityRuleElement extends IWRRuleElement {
    data: ImmunityData;
}
interface ImmunityData extends IWRRuleElementData {
    type: ImmunityType;
}
export { ImmunityRuleElement };
