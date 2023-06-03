import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PickableThing } from "@module/apps/pick-a-thing-prompt.ts";
import type { ModelPropsFromSchema } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e } from "../index.ts";
import { ChoiceSetData, ChoiceSetPackQuery, ChoiceSetSchema, ChoiceSetSource, UninflatedChoiceSet } from "./data.ts";
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
    /**
     * If an array was passed, localize & sort the labels and return. If a string, look it up in CONFIG.PF2E and
     * create an array of choices.
     */
    inflateChoices(rollOptions: Set<string>): Promise<PickableThing[]>;
    /** Perform an NeDB query against the system feats compendium (or a different one if specified) */
    queryCompendium(choices: ChoiceSetPackQuery, actorRollOptions: Set<string>): Promise<PickableThing<string>[]>;
}
interface ChoiceSetRuleElement extends RuleElementPF2e<ChoiceSetSchema>, ModelPropsFromSchema<ChoiceSetSchema> {
    data: ChoiceSetData;
    flag: string;
}
export { ChoiceSetRuleElement };
