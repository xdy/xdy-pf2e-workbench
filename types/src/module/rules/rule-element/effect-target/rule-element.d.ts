import { RuleElementPF2e, REPreCreateParameters, RuleElementOptions } from "../";
import { EffectPF2e, ItemPF2e } from "@item";
import { EffectTargetData, EffectTargetSource } from "./data";
import { ActorType } from "@actor/data";
/**
 * Present a set of options to the user and assign their selection to an injectable property
 * @category RuleElement
 */
declare class EffectTargetRuleElement extends RuleElementPF2e {
    validActorTypes: ActorType[];
    constructor(data: EffectTargetSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    /**
     * Adjust the effect's name and set the targetId from the user's selection, or set the entire rule element to be
     * ignored if no selection was made.
     */
    preCreate({ ruleSource }: REPreCreateParameters<EffectTargetSource>): Promise<void>;
}
interface EffectTargetRuleElement extends RuleElementPF2e {
    item: Embedded<EffectPF2e>;
    data: EffectTargetData;
}
export { EffectTargetRuleElement };
