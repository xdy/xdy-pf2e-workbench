import { ImmunityType } from "@actor/data/base";
import { IWRRuleElement, IWRRuleElementData } from "./base";
/** @category RuleElement */
declare class ImmunityRuleElement extends IWRRuleElement {
    dictionary: Record<"hidden" | "force" | "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped" | "alignment" | "coldiron" | "energy" | "ghostTouch" | "physical" | "precision" | "salt" | "salt-water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "critical-hits" | "emotion" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "healing" | "magic" | "curse" | "blinded" | "broken" | "clumsy" | "concealed" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "dying" | "encumbered" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "friendly" | "frightened" | "grabbed" | "helpful" | "hostile" | "immobilized" | "indifferent" | "invisible" | "observed" | "paralyzed" | "petrified" | "prone" | "quickened" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "undetected" | "unfriendly" | "unnoticed" | "wounded" | "auditory" | "confusion" | "detection" | "death-effects" | "disease" | "fear-effects" | "inhaled" | "nonmagical-attacks" | "object-immunities" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "spellDeflection" | "swarm-attacks" | "swarm-mind" | "trip" | "visual", string>;
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
