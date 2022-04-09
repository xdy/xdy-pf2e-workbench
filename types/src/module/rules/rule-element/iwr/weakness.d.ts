import { LabeledWeakness, WeaknessType } from "@actor/data/base";
import { IWRRuleElement, IWRRuleElementData } from "./base";
/** @category RuleElement */
declare class WeaknessRuleElement extends IWRRuleElement {
    dictionary: Record<"force" | "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped" | "alignment" | "coldiron" | "energy" | "ghostTouch" | "physical" | "precision" | "salt" | "salt-water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "critical-hits" | "axe" | "emotion" | "splash-damage" | "vampire-weaknesses" | "vorpal-fear" | "vulnerable-to-sunlight", string>;
    get property(): LabeledWeakness[];
    getIWR(value: number): LabeledWeakness | null;
}
interface WeaknessRuleElement extends IWRRuleElement {
    data: WeaknessData;
}
interface WeaknessData extends IWRRuleElementData {
    type: WeaknessType;
}
export { WeaknessRuleElement };
