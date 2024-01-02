import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import { BaseTagSelector, TagSelectorData } from "./base.ts";
import { SelectableTagField, TagSelectorOptions } from "./index.ts";
export type BasicConstructorOptions = Partial<BasicSelectorOptions> & {
    objectProperty: string;
};
declare class TagSelectorBasic<TDocument extends ActorPF2e | ItemPF2e> extends BaseTagSelector<TDocument> {
    #private;
    static get defaultOptions(): TagSelectorOptions;
    protected objectProperty: string;
    constructor(document: TDocument, options: BasicConstructorOptions);
    protected get configTypes(): readonly SelectableTagField[];
    getData(options?: Partial<TagSelectorOptions>): Promise<TagSelectorBasicData<TDocument>>;
    protected _onSearchFilter(_event: KeyboardEvent, _query: string, rgx: RegExp): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface TagSelectorBasic<TDocument extends ActorPF2e | ItemPF2e> extends BaseTagSelector<TDocument> {
    options: BasicSelectorOptions;
}
interface BasicSelectorOptions extends TagSelectorOptions {
    objectProperty: string;
    configTypes: SelectableTagField[];
}
interface TagSelectorBasicData<TDocument extends ActorPF2e | ItemPF2e> extends TagSelectorData<TDocument> {
    choices: Record<string, {
        label: string;
        selected: boolean;
        disabled: boolean;
    }>;
    hasCustomChoices: boolean;
    details: {
        path: string;
        placeholder: string;
        value: string;
    } | null;
    flat: boolean;
}
export { TagSelectorBasic };
export type { BasicSelectorOptions, TagSelectorBasicData };
