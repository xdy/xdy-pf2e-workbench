import { LabeledWeakness, WeaknessType } from "@actor/data/base";
import { IWRRuleElement, IWRRuleElementData } from "./base";
/** @category RuleElement */
declare class WeaknessRuleElement extends IWRRuleElement {
    dictionary: Record<"force" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "positive" | "negative" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "chaotic" | "lawful" | "good" | "evil" | "mental" | "poison" | "untyped" | "adamantine" | "alignment" | "coldiron" | "darkwood" | "energy" | "ghostTouch" | "mithral" | "orichalcum" | "physical" | "precision" | "salt" | "salt-water" | "silver" | "warpglass" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "vorpal" | "weapons" | "critical-hits" | "splash-damage" | "emotion" | "axe" | "vampire-weaknesses" | "vorpal-fear" | "vulnerable-to-sunlight", string>;
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
