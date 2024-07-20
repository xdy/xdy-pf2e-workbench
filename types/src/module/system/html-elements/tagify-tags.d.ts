/**
 * A HTML Element that handles `Tagify` data and always has a `value` of `string[]`.
 * `Tagify` must be bound to the child input element that can be accessed at `HTMLTagifyTagsElement#input`
 */
declare class HTMLTagifyTagsElement extends foundry.applications.elements.AbstractFormInputElement<string[], string> {
    static tagName: string;
    /** The input elmement that the `Tagify` instance is bound to */
    input: HTMLInputElement;
    constructor();
    protected _buildElements(): HTMLElement[];
    protected _setValue(value: string): void;
    _applyInputAttributes(input: HTMLInputElement): void;
    protected _toggleDisabled(disabled: boolean): void;
    _activateListeners(): void;
}
export { HTMLTagifyTagsElement };
