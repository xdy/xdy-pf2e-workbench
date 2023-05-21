import { ActorPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
export declare class StrikingRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    selector: string;
    constructor(data: StrikingSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface StrikingSource extends RuleElementSource {
    selector?: string;
}
export {};
