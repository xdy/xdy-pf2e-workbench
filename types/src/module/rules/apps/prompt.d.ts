/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicatePF2e } from "@system/predication";

/** Prompt the user for the target of the effect they just added to an actor */
declare abstract class RulesElementPrompt<T> extends Application {
    protected item: Embedded<ItemPF2e>;
    private resolve?;
    protected selection: PromptChoice<T> | null;
    protected choices: PromptChoice<T>[];
    protected predicate: PredicatePF2e;
    protected allowNoSelection: boolean;
    constructor(data: RulesElementPromptData<T>);
    get actor(): ActorPF2e;
    static get defaultOptions(): ApplicationOptions;
    /** Collect all options within the specified scope and then eliminate any that fail the predicate test */
    protected getChoices(): PromptChoice<T>[];
    protected getSelection(event: JQuery.ClickEvent): PromptChoice<T> | null;
    abstract get template(): string;
    /** Return a promise containing the user's item selection, or `null` if no selection was made */
    resolveSelection(): Promise<PromptChoice<T> | null>;
    getData(options?: Partial<ApplicationOptions>): Promise<{
        choices: PromptChoice[];
    }>;
    activateListeners($html: JQuery): void;
    /** Close the dialog, applying the effect with configured target or warning the user that something went wrong. */
    close({ force }?: {
        force?: boolean | undefined;
    }): Promise<void>;
}
interface RulesElementPromptData<T> {
    title?: string;
    prompt?: string;
    choices?: PromptChoice<T>[];
    item: Embedded<ItemPF2e>;
    predicate?: PredicatePF2e;
    allowNoSelection?: boolean;
}
interface PromptChoice<T = string | number | object> {
    value: T;
    label: string;
    img?: string;
    domain?: string[];
    predicate?: PredicatePF2e;
    /** A numeric order by which to sort the choices */
    sort?: number;
}
export { RulesElementPrompt, RulesElementPromptData, PromptChoice };
