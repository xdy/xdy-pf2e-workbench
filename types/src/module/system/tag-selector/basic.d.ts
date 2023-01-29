/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/index";
import { ItemPF2e } from "@item/index";
import { BaseTagSelector } from "./base";
import { SelectableTagField, TagSelectorOptions } from ".";
export interface BasicSelectorOptions extends TagSelectorOptions {
    objectProperty: string;
    configTypes: SelectableTagField[];
}
export type BasicConstructorOptions = Partial<BasicSelectorOptions> & {
    objectProperty: string;
};
declare class TagSelectorBasic<TDocument extends ActorPF2e | ItemPF2e> extends BaseTagSelector<TDocument> {
    allowCustom: boolean;
    /** Search string for filtering */
    searchString: string;
    private filterTimeout;
    protected objectProperty: string;
    constructor(object: TDocument, options: BasicConstructorOptions);
    protected get configTypes(): readonly SelectableTagField[];
    static get defaultOptions(): TagSelectorOptions;
    getData(): Promise<TagSelectorBasicData<TDocument>>;
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
interface TagSelectorBasic<TDocument extends ActorPF2e | ItemPF2e> extends BaseTagSelector<TDocument> {
    options: BasicSelectorOptions;
}
interface TagSelectorBasicData<TDocument extends ActorPF2e | ItemPF2e> extends FormApplicationData<TDocument> {
    choices: Record<string, {
        label: string;
        selected: boolean;
        disabled: boolean;
    }>;
    allowCustom: boolean;
    custom: string | null;
    flat: boolean;
}
export { TagSelectorBasic };
