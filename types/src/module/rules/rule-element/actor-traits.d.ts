import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
declare class ActorTraitsRuleElement extends RuleElementPF2e {
    add: string[];
    remove: string[];
    constructor(data: ActorTraitsSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface ActorTraitsSource extends RuleElementSource {
    add?: unknown;
    remove?: unknown;
}
export { ActorTraitsRuleElement };
