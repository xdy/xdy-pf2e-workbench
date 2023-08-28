/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { SelectableTagField } from "./index.ts";
interface TagSelectorOptions extends DocumentSheetOptions {
    allowCustom?: boolean;
    /** Is the target data property a flat array rather than a values object? */
    flat?: boolean;
    customChoices?: Record<string, string>;
}
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
    /** Localize and sort choices */
    protected sortChoices(choices: Record<string, string>): Record<string, string>;
}
interface TagSelectorData<TDocument extends ActorPF2e | ItemPF2e> extends DocumentSheetData<TDocument> {
    documentType: string;
}
export { BaseTagSelector, TagSelectorData, TagSelectorOptions };
