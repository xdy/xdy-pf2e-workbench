import { LabeledResistance, ResistanceType } from "@actor/data/base";
import { IWRRuleElement, IWRRuleElementData } from "./base";
/** @category RuleElement */
declare class ResistanceRuleElement extends IWRRuleElement {
    dictionary: Record<"all" | "force" | "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped" | "alignment" | "coldiron" | "energy" | "ghostTouch" | "physical" | "precision" | "salt" | "salt-water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "critical-hits" | "protean anatomy", string>;
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
