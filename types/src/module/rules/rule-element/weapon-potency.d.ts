import { ActorPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * Copies potency runes from the weapon its attached to, to another weapon based on a predicate.
 * @category RuleElement
 */
export declare class WeaponPotencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    selector: string;
    constructor(data: WeaponPotencySource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface WeaponPotencySource extends RuleElementSource {
    selector?: unknown;
}
export {};
