import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./";
declare class ActorTraitsRuleElement extends RuleElementPF2e {
    add: string[];
    remove: string[];
    constructor(data: ActorTraitsSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface ActorTraitsSource extends RuleElementSource {
    add?: unknown;
    remove?: unknown;
}
export { ActorTraitsRuleElement };
