import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * Copies potency runes from the weapon its attached to, to another weapon based on a predicate.
 * @category RuleElement
 */
export declare class WeaponPotencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    selector: string;
    constructor(data: WeaponPotencySource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface WeaponPotencySource extends RuleElementSource {
    selector?: unknown;
}
export {};
