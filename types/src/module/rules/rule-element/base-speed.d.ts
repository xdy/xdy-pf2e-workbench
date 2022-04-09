import { RuleElementPF2e } from "./";
import { ActorType } from "@actor/data";
import { CreaturePF2e } from "@actor";
/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    beforePrepareData(): void;
}
interface BaseSpeedRuleElement extends RuleElementPF2e {
    get actor(): CreaturePF2e;
}
export { BaseSpeedRuleElement };
