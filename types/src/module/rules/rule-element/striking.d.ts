import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./";
export declare class StrikingRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    selector: string;
    constructor(data: StrikingSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface StrikingSource extends RuleElementSource {
    selector?: string;
}
export {};
