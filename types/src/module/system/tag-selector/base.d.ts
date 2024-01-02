/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import type { SelectableTagField } from "./index.ts";
declare abstract class BaseTagSelector<TDocument extends ActorPF2e | ItemPF2e> extends DocumentSheet<TDocument, TagSelectorOptions> {
    #private;
    static get defaultOptions(): TagSelectorOptions;
    choices: Record<string, string>;
    /** The object path to the property containing the tags */
    protected abstract objectProperty: string;
    /** Whether the tags are in an object containing a `value` array property or just an array by its lonesome */
    flat: boolean;
    constructor(document: TDocument, options?: Partial<TagSelectorOptions>);
    get id(): string;
    get title(): string;
    protected abstract get configTypes(): readonly SelectableTagField[];
    getData(options?: Partial<TagSelectorOptions> | undefined): Promise<TagSelectorData<TDocument>>;
    activateListeners($html: JQuery): void;
}
interface TagSelectorOptions extends DocumentSheetOptions {
    objectProperty?: string;
    /** Is the target data property a flat array rather than a `value` object? */
    flat?: boolean;
    customChoices?: Record<string, string>;
}
interface TagSelectorData<TDocument extends ActorPF2e | ItemPF2e> extends DocumentSheetData<TDocument> {
    documentType: string;
}
export { BaseTagSelector };
export type { TagSelectorData, TagSelectorOptions };
