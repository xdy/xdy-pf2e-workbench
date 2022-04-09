/** Prepare form options on an item or actor sheet */
declare function createSheetOptions(options: Record<string, string>, selections?: SheetSelections, { selected }?: {
    selected?: boolean | undefined;
}): SheetOptions;
declare function createSheetTags(options: Record<string, string>, selections: SheetSelections): SheetOptions;
interface SheetOption {
    value: string;
    label: string;
    selected: boolean;
}
declare type SheetOptions = Record<string, SheetOption>;
declare type SheetSelections = {
    value: (string | number)[];
    custom?: string;
} | (string[] & {
    custom?: never;
});
export { createSheetOptions, createSheetTags, SheetOption, SheetOptions };
