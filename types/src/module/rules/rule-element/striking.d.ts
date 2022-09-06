import { RuleElementPF2e } from "./";
import { ActorType } from "@actor/data";
export declare class StrikingRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    beforePrepareData(): void;
}
