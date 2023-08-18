/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { PickableThing, PickAThingConstructorArgs, PickAThingPrompt, PromptTemplateData } from "@module/apps/pick-a-thing-prompt.ts";
import { PredicatePF2e } from "@system/predication.ts";
/** Prompt the user for a selection among a set of options */
export declare class ChoiceSetPrompt extends PickAThingPrompt<string | number | object> {
    /** The prompt statement to present the user in this application's window */
    prompt: string;
    /** Does this choice set contain items? If true, an item-drop zone may be added */
    containsItems: boolean;
    /** A predicate validating a dragged & dropped item selection */
    allowedDrops: {
        label: string | null;
        predicate: PredicatePF2e;
    } | null;
    constructor(data: ChoiceSetPromptData);
    static get defaultOptions(): ApplicationOptions;
    getData(options?: Partial<ApplicationOptions>): Promise<ChoiceSetTemplateData>;
    protected getChoices(): PickableThing[];
    setChoices(choices: PickableThing[]): void;
    activateListeners($html: JQuery): void;
    /** Return early if there is only one choice */
    resolveSelection(): Promise<PickableThing<string | number | object> | null>;
    /** Handle a dropped homebrew item */
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    protected _canDragDrop(): boolean;
}
interface ChoiceSetPromptData extends PickAThingConstructorArgs<string | number | object> {
    prompt: string;
    choices?: PickableThing[];
    containsItems: boolean;
    allowedDrops: {
        label: string | null;
        predicate: PredicatePF2e;
    } | null;
}
interface ChoiceSetTemplateData extends PromptTemplateData {
    prompt: string;
    choices: PickableThing[];
    includeDropZone: boolean;
    allowNoSelection: boolean;
}
export {};
