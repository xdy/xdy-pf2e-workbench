import { LabeledResistance, ResistanceType } from "@actor/data/base";
import { IWRRuleElement, IWRRuleElementData } from "./base";
/** @category RuleElement */
declare class ResistanceRuleElement extends IWRRuleElement {
    dictionary: Record<"all" | "force" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "positive" | "negative" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "chaotic" | "lawful" | "good" | "evil" | "mental" | "poison" | "untyped" | "adamantine" | "alignment" | "coldiron" | "darkwood" | "energy" | "ghostTouch" | "mithral" | "orichalcum" | "physical" | "precision" | "salt" | "salt-water" | "silver" | "warpglass" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "critical-hits" | "protean anatomy", string>;
    get property(): LabeledResistance[];
    getIWR(value: number): LabeledResistance | null;
}
interface ResistanceRuleElement extends IWRRuleElement {
    data: ResistanceData;
}
interface ResistanceData extends IWRRuleElementData {
    type: ResistanceType;
}
export { ResistanceRuleElement };
