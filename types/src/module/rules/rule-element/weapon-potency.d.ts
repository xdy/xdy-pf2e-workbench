import { RuleElementPF2e } from "./";
import { ActorType } from "@actor/data";
/**
 * Copies potency runes from the weapon its attached to, to another weapon based on a predicate.
 * @category RuleElement
 */
export declare class WeaponPotencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    beforePrepareData(): void;
}
