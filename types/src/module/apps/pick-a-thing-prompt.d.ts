/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ItemPF2e } from "@item";
import type { UserPF2e } from "@module/user/document.ts";
import { Predicate } from "@system/predication.ts";
import Tagify from "@yaireo/tagify";
/** Prompt the user to pick from a number of options */
declare abstract class PickAThingPrompt<TItem extends ItemPF2e, TThing extends string | number | object> extends Application {
    #private;
    protected item: TItem;
    protected selection: PickableThing<TThing> | null;
    protected choices: PickableThing<TThing>[];
    /** If the number of choices is beyond a certain length, a select menu is presented instead of a list of buttons */
    protected selectMenu?: Tagify<{
        value: string;
        label: string;
    }>;
    protected predicate: Predicate;
    protected allowNoSelection: boolean;
    constructor(data: PickAThingConstructorArgs<TItem, TThing>);
    get actor(): TItem["parent"];
    static get defaultOptions(): ApplicationOptions;
    protected getSelection(event: MouseEvent): PickableThing<TThing> | null;
    /** Return a promise containing the user's item selection, or `null` if no selection was made */
    resolveSelection(): Promise<PickableThing<TThing> | null>;
    getData(): Promise<PromptTemplateData>;
    activateListeners($html: JQuery): void;
    /** Close the dialog, applying the effect with configured target or warning the user that something went wrong. */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
}
interface PickAThingConstructorArgs<TItem extends ItemPF2e, TThing extends string | number | object> {
    title?: string;
    prompt?: string;
    choices: PickableThing<TThing>[];
    item: TItem;
    predicate?: Predicate;
    allowNoSelection?: boolean;
}
interface PickableThing<T extends string | number | object = string | number | object> {
    value: T;
    label: string;
    img?: string;
    domain?: string[];
    predicate?: Predicate;
}
interface PromptTemplateData {
    choices: PickableThing[];
    /** An item pertinent to the selection being made */
    item: ItemPF2e;
    user: UserPF2e;
}
export { PickAThingPrompt };
export type { PickAThingConstructorArgs, PickableThing, PromptTemplateData };
