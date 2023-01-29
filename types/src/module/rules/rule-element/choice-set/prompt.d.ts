/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { PickableThing, PickAThingConstructorArgs, PickAThingPrompt, PromptTemplateData } from "@module/apps/pick-a-thing-prompt";
import { PredicatePF2e } from "@system/predication";
/** Prompt the user for a selection among a set of options */
export declare class ChoiceSetPrompt extends PickAThingPrompt<string | number | object> {
    /** Does this choice set contain UUIDs? If true, options are always buttons and an item-drop zone is added */
    private containsUUIDs;
    /** The prompt statement to present the user in this application's window */
    prompt: string;
    /** A predicate validating a dragged & dropped item selection */
    allowedDrops: {
        label: string | null;
        predicate: PredicatePF2e;
    };
    constructor(data: ChoiceSetPromptData);
    static get defaultOptions(): ApplicationOptions;
    get template(): string;
    getData(options?: Partial<ApplicationOptions>): Promise<ChoiceSetTemplateData>;
    protected getChoices(): PickableThing[];
    activateListeners($html: JQuery): void;
    /** Return early if there is only one choice */
    resolveSelection(): Promise<PickableThing<string | number | object> | null>;
    /** Handle a dropped homebrew item */
    _onDrop(event: ElementDragEvent): Promise<void>;
    _canDragDrop(): boolean;
}
interface ChoiceSetPromptData extends PickAThingConstructorArgs<string | number | object> {
    prompt: string;
    choices?: PickableThing[];
    containsUUIDs: boolean;
    allowedDrops: {
        label: string | null;
        predicate: PredicatePF2e;
    };
}
interface ChoiceSetTemplateData extends PromptTemplateData {
    prompt: string;
    choices: PickableThing[];
    containsUUIDs: boolean;
    allowNoSelection: boolean;
}
export {};
