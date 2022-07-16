import { RuleElementPF2e } from "./";
import { ActorType } from "@actor/data";
import { PredicatePF2e } from "@system/predication";
/**
 * @category RuleElement
 */
export declare class StrikingRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    beforePrepareData(): void;
}
export interface StrikingPF2e {
    label: string;
    bonus: number;
    predicate?: PredicatePF2e;
}
