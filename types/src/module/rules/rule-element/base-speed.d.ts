import { ActorPF2e, CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElementPF2e {
    #private;
    protected static validActorTypes: ActorType[];
    private selector;
    private value;
    constructor(data: BaseSpeedSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface BaseSpeedSource extends RuleElementSource {
    selector?: unknown;
}
interface BaseSpeedRuleElement extends RuleElementPF2e {
    get actor(): CreaturePF2e;
}
export { BaseSpeedRuleElement };
