import { RuleElementPF2e, RuleElementOptions } from "../";
import { ItemPF2e } from "@item";
import { ChoiceSetData, ChoiceSetSource } from "./data";
/**
 * Present a set of options to the user and assign their selection to an injectable property
 * @category RuleElement
 */
declare class ChoiceSetRuleElement extends RuleElementPF2e {
    #private;
    /** The prompt to present in the ChoiceSet application window */
    private prompt;
    /** Should the parent item's name be adjusted to reflect the choice made? */
    private adjustName;
    /** Allow the user to make no selection without suppressing all other rule elements on the parent item */
    private allowNoSelection;
    /** A predicate to valide dropped item selections */
    private allowedDrops;
    /** If the choice set contains UUIDs, the item slug can be recorded instead of the selected UUID */
    private recordSlug;
    /** An optional roll option to be set from the selection */
    private rollOption;
    constructor(data: ChoiceSetSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    /**
     * Adjust the effect's name and set the targetId from the user's selection, or set the entire rule element to be
     * ignored if no selection was made.
     */
    preCreate({ ruleSource }: RuleElementPF2e.PreCreateParams<ChoiceSetSource>): Promise<void>;
    private setDefaultFlag;
    /**
     * If an array was passed, localize & sort the labels and return. If a string, look it up in CONFIG.PF2E and
     * create an array of choices.
     */
    private inflateChoices;
    private choicesFromPath;
    private choicesFromOwnedItems;
    private choicesFromUnarmedAttacks;
    /** Perform an NeDB query against the system feats compendium (or a different one if specified) */
    private queryCompendium;
    /** If this rule element's parent item was granted with a pre-selected choice, the prompt is to be skipped */
    private getPreselection;
}
interface ChoiceSetRuleElement extends RuleElementPF2e {
    data: ChoiceSetData;
}
export { ChoiceSetRuleElement };
