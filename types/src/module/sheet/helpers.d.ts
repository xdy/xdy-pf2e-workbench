/** Prepare form options on an item or actor sheet */
declare function createSheetOptions(options: Record<string, string | {
    label: string;
}>, selections?: SheetSelections, { selected }?: {
    selected?: boolean | undefined;
}): SheetOptions;
declare function createSheetTags(options: Record<string, string | {
    label: string;
}>, selections: SheetSelections): SheetOptions;
declare function createTagifyTraits(traits: Iterable<string>, { sourceTraits, record }: TagifyTraitOptions): TagifyEntry[];
/**
 * Get a CSS class for an adjusted value
 * @param value A value from prepared/derived data
 * @param base A value from base/source data
 * @param options.better Which value is "better" in the context of the data: default is "higher"
 **/
declare function getAdjustment(value: number, base: number, { better }?: {
    better?: "higher" | "lower";
}): "adjusted-higher" | "adjusted-lower" | null;
declare function getAdjustedValue(value: number, reference: number, options?: {
    better?: "higher" | "lower";
}): AdjustedValue;
interface AdjustedValue {
    value: number;
    adjustedHigher: boolean;
    adjustedLower: boolean;
    adjustmentClass: "adjusted-higher" | "adjusted-lower" | null;
}
/** Override to refocus tagify elements in _render() to workaround handlebars full re-render */
declare function maintainFocusInRender(sheet: Application, renderLogic: () => Promise<void>): Promise<void>;
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
interface TagifyTraitOptions {
    sourceTraits?: Iterable<string>;
    record?: Record<string, string>;
}
interface TagifyEntry {
    id: string;
    value: string;
    /** If true, the tag will exist in tagify but unremovable. */
    readonly: boolean;
    /**
     * If true, it will be hidden from tagify itself but exist in submit data.
     * Tagify treats any value as true, even false or null.
     */
    hidden?: true;
}
export { createSheetOptions, createSheetTags, createTagifyTraits, getAdjustedValue, getAdjustment, maintainFocusInRender, };
export type { AdjustedValue, SheetOption, SheetOptions, TagifyEntry };
