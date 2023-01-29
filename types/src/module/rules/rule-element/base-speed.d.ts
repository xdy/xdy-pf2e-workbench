import { CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from ".";
/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElementPF2e {
    #private;
    protected static validActorTypes: ActorType[];
    private selector;
    private value;
    constructor(data: BaseSpeedSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface BaseSpeedSource extends RuleElementSource {
    selector?: unknown;
}
interface BaseSpeedRuleElement extends RuleElementPF2e {
    get actor(): CreaturePF2e;
}
export { BaseSpeedRuleElement };
