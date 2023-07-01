import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
export declare class StrikingRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    selector: string;
    constructor(data: StrikingSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface StrikingSource extends RuleElementSource {
    selector?: string;
}
export {};
