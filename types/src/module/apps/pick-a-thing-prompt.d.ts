/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicatePF2e } from "@system/predication";
import Tagify from "@yaireo/tagify";
/** Prompt the user to pick from a number of options */
declare abstract class PickAThingPrompt<T> extends Application {
    protected item: Embedded<ItemPF2e>;
    private resolve?;
    protected selection: PickableThing<T> | null;
    protected choices: PickableThing<T>[];
    /** If the number of choices is beyond a certain length, a select menu is presented instead of a list of buttons */
    protected selectMenu?: Tagify<{
        value: string;
        label: string;
    }>;
    protected predicate: PredicatePF2e;
    protected allowNoSelection: boolean;
    constructor(data: PickAThingConstructorArgs<T>);
    get actor(): ActorPF2e;
    static get defaultOptions(): ApplicationOptions;
    /** Collect all options within the specified scope and then eliminate any that fail the predicate test */
    protected getChoices(): PickableThing<T>[];
    protected getSelection(event: MouseEvent): PickableThing<T> | null;
    abstract get template(): string;
    /** Return a promise containing the user's item selection, or `null` if no selection was made */
    resolveSelection(): Promise<PickableThing<T> | null>;
    getData(options?: Partial<ApplicationOptions>): Promise<PromptTemplateData>;
    activateListeners($html: JQuery): void;
    /** Close the dialog, applying the effect with configured target or warning the user that something went wrong. */
    close({ force }?: {
        force?: boolean | undefined;
    }): Promise<void>;
}
interface PickAThingConstructorArgs<T> {
    title?: string;
    prompt?: string;
    choices?: PickableThing<T>[];
    item: Embedded<ItemPF2e>;
    predicate?: PredicatePF2e;
    allowNoSelection?: boolean;
}
interface PickableThing<T = string | number | object> {
    value: T;
    label: string;
    img?: string;
    domain?: string[];
    predicate?: PredicatePF2e;
}
interface PromptTemplateData {
    choices: PickableThing[];
    /** Whether to use a select menu instead of a column of buttons */
    selectMenu: boolean;
}
export { PickAThingConstructorArgs, PickAThingPrompt, PickableThing, PromptTemplateData };
