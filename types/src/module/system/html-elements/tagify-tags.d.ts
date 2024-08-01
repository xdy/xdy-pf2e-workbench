/**
 * A HTML Element that handles `Tagify` data and always has a `value` of `string[]`.
 * `Tagify` must be bound to the child input element that can be accessed at `HTMLTagifyTagsElement#input`
 */
declare class HTMLTagifyTagsElement extends foundry.applications.elements.AbstractFormInputElement<TagifySelection[] | string[], string> {
    static tagName: string;
    /** The input elmement that the `Tagify` instance is bound to */
    input: HTMLInputElement;
    constructor();
    protected _buildElements(): HTMLElement[];
    /** Overwritten so that submit data receives a string array */
    protected _getValue(): string[];
    protected _setValue(value: string): void;
    _applyInputAttributes(input: HTMLInputElement): void;
    protected _toggleDisabled(disabled: boolean): void;
    _activateListeners(): void;
}
type TagifySelection = {
    id?: string;
    value?: string;
    readonly?: boolean;
};
export { HTMLTagifyTagsElement };
