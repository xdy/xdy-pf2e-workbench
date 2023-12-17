import type { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PickableThing } from "@module/apps/pick-a-thing-prompt.ts";
import { RuleElementOptions, RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema } from "../data.ts";
import { AllowedDropsData, ChoiceSetPackQuery, ChoiceSetSchema, ChoiceSetSource, UninflatedChoiceSet } from "./data.ts";
/**
 * Present a set of options to the user and assign their selection to an injectable property
 * @category RuleElement
 */
declare class ChoiceSetRuleElement extends RuleElementPF2e<ChoiceSetSchema> {
    #private;
    choices: UninflatedChoiceSet;
    flag: string;
    allowedDrops: AllowedDropsData | null;
    allowNoSelection: boolean;
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
    preCreate({ itemSource, ruleSource, tempItems, }: RuleElementPF2e.PreCreateParams<ChoiceSetSource>): Promise<void>;
    /**
     * If an array was passed, localize & sort the labels and return. If a string, look it up in CONFIG.PF2E and
     * create an array of choices.
     * @param rollOptions  A set of actor roll options to for use in predicate testing
     * @param tempItems Items passed to #queryCompendium for checking max takability of feats
     * @returns The array of choices to present to the user
     */
    inflateChoices(rollOptions: Set<string>, tempItems: ItemPF2e<ActorPF2e>[]): Promise<PickableThing[]>;
    /** Perform a query via predicate testing against compendium items */
    queryCompendium(choices: ChoiceSetPackQuery, actorRollOptions: Set<string>, tempItems: ItemPF2e<ActorPF2e>[]): Promise<PickableThing<string>[]>;
}
interface ChoiceSetRuleElement extends RuleElementPF2e<ChoiceSetSchema>, ModelPropsFromRESchema<ChoiceSetSchema> {
}
export { ChoiceSetRuleElement };
