/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/index";
import { ItemPF2e } from "@item/index";
import { TagSelectorBase } from "./base";
import { SelectableTagField, TagSelectorOptions } from ".";
export interface BasicSelectorOptions extends TagSelectorOptions {
    objectProperty: string;
    configTypes: SelectableTagField[];
}
export declare type BasicConstructorOptions = Partial<BasicSelectorOptions> & {
    objectProperty: string;
};
export declare class TagSelectorBasic extends TagSelectorBase {
    allowCustom: boolean;
    /** Search string for filtering */
    searchString: string;
    private filterTimeout;
    constructor(object: ActorPF2e | ItemPF2e, options: BasicConstructorOptions);
    protected get configTypes(): readonly SelectableTagField[];
    static get defaultOptions(): TagSelectorOptions & {
        template: string;
        height: number;
    };
    getData(): {
        choices: Record<string, {
            label: string;
            selected: boolean;
            disabled: boolean;
        }>;
        allowCustom: boolean;
        custom: string | null;
        flat: boolean;
        object?: object | ItemPF2e | ActorPF2e | undefined;
        options?: Partial<FormApplicationOptions> | undefined;
        title?: string | undefined;
    } | {
        choices: Record<string, {
            label: string;
            selected: boolean;
            disabled: boolean;
        }>;
        allowCustom: boolean;
        custom: string | null;
        flat: boolean;
        then<TResult1 = FormApplicationData<ItemPF2e | ActorPF2e>, TResult2 = never>(onfulfilled?: ((value: FormApplicationData<ItemPF2e | ActorPF2e>) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<FormApplicationData<ItemPF2e | ActorPF2e> | TResult>;
        finally(onfinally?: (() => void) | null | undefined): Promise<FormApplicationData<ItemPF2e | ActorPF2e>>;
        [Symbol.toStringTag]: string;
    };
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    private getUpdateData;
    /**
     * Filter the potential traits to only show ones which match a provided search string
     * @param searchString The search string to match
     */
    private search;
    /**
     * Handle trait filtering through search field
     * Toggle the visibility of indexed trait entries by name match
     */
    private onFilterResults;
}
export interface TagSelectorBasic {
    options: BasicSelectorOptions;
}
