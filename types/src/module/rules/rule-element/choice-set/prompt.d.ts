/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { PromptChoice, RulesElementPrompt, RulesElementPromptData } from "@module/rules/apps/prompt";
import { PredicatePF2e } from "@system/predication";

/** Prompt the user for a selection among a set of options */
export declare class ChoiceSetPrompt extends RulesElementPrompt<string | number | object> {
    /** Does this choice set contain UUIDs? If true, options are always buttons and an item-drop zone is added */
    private containsUUIDs;
    /** The prompt statement to present the user in this application's window */
    prompt: string;
    /** A predicate validating a dragged & dropped item selection */
    allowedDrops: PredicatePF2e;
    constructor(data: ChoiceSetPromptData);
    static get defaultOptions(): ApplicationOptions;
    get template(): string;
    getData(options?: Partial<ApplicationOptions>): Promise<ChoiceSetTemplateData>;
    protected getChoices(): PromptChoice[];
    activateListeners($html: JQuery): void;
    /** Handle a dropped homebrew item */
    _onDrop(event: ElementDragEvent): Promise<void>;
    _canDragDrop(): boolean;
}
interface ChoiceSetPromptData extends RulesElementPromptData<string | number | object> {
    prompt?: string;
    choices?: PromptChoice[];
    containsUUIDs: boolean;
    allowedDrops: PredicatePF2e;
}
interface ChoiceSetTemplateData {
    prompt: string;
    choices: PromptChoice[];
    containsUUIDs: boolean;
    allowNoSelection: boolean;
}
export {};
