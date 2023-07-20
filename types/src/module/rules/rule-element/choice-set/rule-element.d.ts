import { PickableThing } from "@module/apps/pick-a-thing-prompt.ts";
import { RuleElementOptions, RuleElementPF2e } from "../index.ts";
import { ChoiceSetPackQuery, ChoiceSetSchema, ChoiceSetSource, UninflatedChoiceSet } from "./data.ts";
/**
 * Present a set of options to the user and assign their selection to an injectable property
 * @category RuleElement
 */
declare class ChoiceSetRuleElement extends RuleElementPF2e<ChoiceSetSchema> {
    #private;
    /**
     * The options from which the user can choose. If a string is provided, it is treated as a reference to a record in
     * `CONFIG.PF2E`, and the `PromptChoice` array is composed from its entries.
     */
    choices: UninflatedChoiceSet;
    flag: string;
    /** Whether this choice set consists of items */
    containsItems: boolean;
    /** The user's selection from among the options in `choices`, or otherwise `null` */
    selection: string | number | object | null;
    constructor(data: ChoiceSetSource, options: RuleElementOptions);
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
}
export { ChoiceSetRuleElement };
