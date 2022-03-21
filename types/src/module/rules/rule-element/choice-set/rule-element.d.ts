import { REPreCreateParameters, RuleElementOptions, RuleElementPF2e } from "../index";
import { ItemPF2e } from "@item";
import { ChoiceSetData, ChoiceSetSource } from "./data";

/**
 * Present a set of options to the user and assign their selection to an injectable property
 * @category RuleElement
 */
declare class ChoiceSetRuleElement extends RuleElementPF2e {
    /** Allow the user to make no selection without suppressing all other rule elements on the parent item */
    allowNoSelection: boolean;
    constructor(data: ChoiceSetSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    /**
     * Adjust the effect's name and set the targetId from the user's selection, or set the entire rule element to be
     * ignored if no selection was made.
     */
    preCreate({ ruleSource }: REPreCreateParameters<ChoiceSetSource>): Promise<void>;
    private setDefaultFlag;
    /**
     * If an array was passed, localize & sort the labels and return. If a string, look it up in CONFIG.PF2E and
     * create an array of choices.
     */
    private inflateChoices;
    /** Perform an NeDB query against the system feats compendium (or a different one if specified) */
    private queryFeats;
    /** If this rule element's parent item was granted with a pre-selected choice, the prompt is to be skipped */
    private getPreselection;
}
interface ChoiceSetRuleElement extends RuleElementPF2e {
    data: ChoiceSetData;
}
export { ChoiceSetRuleElement };
