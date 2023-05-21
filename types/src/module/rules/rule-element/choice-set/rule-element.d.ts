import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import type { ModelPropsFromSchema } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e } from "../index.ts";
import { ChoiceSetData, ChoiceSetSchema, ChoiceSetSource, UninflatedChoiceSet } from "./data.ts";
/**
 * Present a set of options to the user and assign their selection to an injectable property
 * @category RuleElement
 */
declare class ChoiceSetRuleElement extends RuleElementPF2e<ChoiceSetSchema> {
    #private;
    /** The choices one of various possible "uninflated" forms */
    choices: UninflatedChoiceSet;
    /** Whether this choice set consists of items */
    containsItems: boolean;
    /** The user's selection from among the options in `choices`, or otherwise `null` */
    selection: string | number | object | null;
    constructor(data: ChoiceSetSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    static defineSchema(): ChoiceSetSchema;
    /**
     * Adjust the effect's name and set the targetId from the user's selection, or set the entire rule element to be
     * ignored if no selection was made.
     */
    preCreate({ itemSource, ruleSource, }: RuleElementPF2e.PreCreateParams<ChoiceSetSource>): Promise<void>;
}
interface ChoiceSetRuleElement extends RuleElementPF2e<ChoiceSetSchema>, ModelPropsFromSchema<ChoiceSetSchema> {
    data: ChoiceSetData;
    flag: string;
}
export { ChoiceSetRuleElement };
