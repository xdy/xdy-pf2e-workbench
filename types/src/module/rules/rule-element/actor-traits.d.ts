import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementSource, RuleElementOptions } from "./";
declare class ActorTraitsRuleElement extends RuleElementPF2e {
    add: string[];
    remove: string[];
    constructor(data: ActorTraitsSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface ActorTraitsSource extends RuleElementSource {
    add?: unknown;
    remove?: unknown;
}
export { ActorTraitsRuleElement };
