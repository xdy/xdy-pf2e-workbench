import { CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElementPF2e {
    #private;
    protected static validActorTypes: ActorType[];
    private selector;
    private value;
    constructor(data: BaseSpeedSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface BaseSpeedSource extends RuleElementSource {
    selector?: unknown;
}
interface BaseSpeedRuleElement extends RuleElementPF2e {
    get actor(): CreaturePF2e;
}
export { BaseSpeedRuleElement };
