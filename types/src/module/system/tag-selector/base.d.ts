/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { SelectableTagField } from ".";
interface TagSelectorOptions extends FormApplicationOptions {
    allowCustom?: boolean;
    /** Is the target data property a flat array rather than a values object? */
    flat?: boolean;
    customChoices?: Record<string, string>;
}
declare abstract class BaseTagSelector<TDocument extends ActorPF2e | ItemPF2e = ActorPF2e | ItemPF2e> extends FormApplication<TDocument> {
    choices: Record<string, string>;
    /** The object path to the property containing the tags */
    protected abstract objectProperty: string;
    /** Whether the tags are in an object containing a `value` array property or just an array by its lonesome */
    flat: boolean;
    constructor(object: TDocument, options?: Partial<TagSelectorOptions>);
    protected abstract get configTypes(): readonly SelectableTagField[];
    static get defaultOptions(): TagSelectorOptions;
    protected abstract _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    activateListeners($html: JQuery): void;
    /**
     * Builds an object of all keys of this.configTypes from CONFIG.PF2E
     * @returns An object of all key and translated value pairs sorted by key
     */
    private getChoices;
    /** Localize and sort choices */
    protected sortChoices(choices: Record<string, string>): Record<string, string>;
}
interface BaseTagSelector {
    options: FormApplicationOptions;
}
export { BaseTagSelector, TagSelectorOptions };
