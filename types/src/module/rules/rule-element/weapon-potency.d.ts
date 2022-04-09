import { RuleElementPF2e } from "./";
import { ActorType } from "@actor/data";
import { PredicatePF2e } from "@system/predication";
/**
 * Copies potency runes from the weapon its attached to, to another weapon based on a predicate.
 * @category RuleElement
 */
declare class WeaponPotencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    beforePrepareData(): void;
}
interface WeaponPotencyPF2e {
    label: string;
    bonus: number;
    type: "item" | "potency";
    predicate?: PredicatePF2e;
    property?: string[];
}
export { WeaponPotencyRuleElement, WeaponPotencyPF2e };
