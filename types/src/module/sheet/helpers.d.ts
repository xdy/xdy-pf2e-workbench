/** Prepare form options on an item or actor sheet */
declare function createSheetOptions(options: Record<string, string>, selections?: SheetSelections, { selected }?: {
    selected?: boolean | undefined;
}): SheetOptions;
declare function createSheetTags(options: Record<string, string>, selections: SheetSelections): SheetOptions;
/**
 * Process tagify elements in a form, converting their data into something the pf2e system can handle.
 * This method is meant to be called in _getSubmitData().
 */
declare function processTagifyInSubmitData(form: HTMLFormElement, data: Record<string, unknown>): void;
/** Override to refocus tagify elements in _render() to workaround handlebars full re-render */
declare function maintainTagifyFocusInRender(sheet: DocumentSheet, renderLogic: () => Promise<void>): Promise<void>;
interface SheetOption {
    value: string;
    label: string;
    selected: boolean;
}
type SheetOptions = Record<string, SheetOption>;
type SheetSelections = {
    value: (string | number)[];
} | (string[] & {
    custom?: never;
});
export { createSheetOptions, createSheetTags, maintainTagifyFocusInRender, processTagifyInSubmitData, SheetOption, SheetOptions, };
