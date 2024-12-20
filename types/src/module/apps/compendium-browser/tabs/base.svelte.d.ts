import MiniSearch from "minisearch";
import { CompendiumBrowser, CompendiumBrowserOpenTabOptions } from "../browser.ts";
import { BrowserTabs, ContentTabName } from "../data.ts";
import type { BrowserFilter, CheckboxOptions, CompendiumBrowserIndexData, RangesInputData, TraitData } from "./data.ts";

export declare abstract class CompendiumBrowserTab {
    #private;
    /** A reference to the parent CompendiumBrowser */
    protected browser: CompendiumBrowser;
    /** The filter schema for this tab; The tabs filters are rendered based on this.*/
    filterData?: BrowserFilter;
    /** Current results. These are automatically refreshed when the filter changes */
    results: CompendiumBrowserIndexData[];
    /** The maximum number of items shown in the result list element */
    resultLimit: number;
    /** An unmodified copy of this.filterData */
    defaultFilterData: this["filterData"];
    /** The full CompendiumIndex of this tab */
    protected indexData: CompendiumBrowserIndexData[];
    /** Is this tab initialized? */
    isInitialized: boolean;
    /** The total count of items in the currently filtered index */
    totalItemCount: number;
    /** The name of this tab */
    abstract tabName: ContentTabName;
    /** The label for this tab. Can be a translation string */
    protected abstract tabLabel: string;
    /** Whether this tab is visible in the browser */
    visible: boolean;
    /** Minisearch */
    searchEngine: MiniSearch<CompendiumBrowserIndexData>;
    /** Names of the document fields to be indexed. */
    searchFields: string[];
    /** Names of fields to store, so that search results would include them.
     *  By default none, so resuts would only contain the id field. */
    storeFields: string[];
    /** The localized label for this tab */
    get label(): string;
    /** Whether this tab is only visible to a GM */
    get isGMOnly(): boolean;
    constructor(browser: CompendiumBrowser);
    /** Initialize this tab */
    init(force?: boolean): Promise<void>;
    /** Open this tab
     * @param filter An optional initial filter for this tab
     */
    open(options?: CompendiumBrowserOpenTabOptions): Promise<void>;
    /** Returns a clean copy of the filterData for this tab. Initializes the tab if necessary. */
    getFilterData(): Promise<this["filterData"]>;
    /** Reset all filters */
    resetFilters(): void;
    /** Check this tabs type */
    isOfType<T extends ContentTabName>(...types: T[]): this is BrowserTabs[T];
    /** Load and prepare the compendium index and set filter options */
    protected abstract loadData(): Promise<void>;
    /** Prepare the the filterData object of this tab */
    protected abstract prepareFilterData(): this["filterData"];
    /** Filter indexData */
    protected abstract filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected filterTraits(traits: string[], selected: TraitData["selected"], condition: TraitData["conjunction"]): boolean;
    /** Sort result array by name, level or price */
    protected sortResult(result: CompendiumBrowserIndexData[]): CompendiumBrowserIndexData[];
    /** Return new range filter values based on input */
    parseRangeFilterInput(_name: string, lower: string, upper: string): RangesInputData["values"];
    /** Check if an array includes any keys of another array */
    protected arrayIncludes(array: string[], other: string[]): boolean;
    /** Generates a localized and sorted CheckBoxOptions object from config data */
    protected generateCheckboxOptions(configData: Record<string, string | {
        label: string;
    }>, sort?: boolean): CheckboxOptions;
    protected generateMultiselectOptions<T extends string>(optionsRecord: Record<T, string>, sort?: boolean): {
        value: T;
        label: string;
    }[];
    /** Generates a sorted CheckBoxOptions object from a sources Set */
    protected generateSourceCheckboxOptions(sources: Set<string>): CheckboxOptions;
    /** Provide a best-effort sort of an object (e.g. CONFIG.PF2E.monsterTraits) */
    protected sortedConfig(obj: Record<string, string>): Record<string, string>;
    /** Ensure all index fields are present in the index data */
    protected hasAllIndexFields(data: CompendiumIndexData, indexFields: string[]): boolean;
    createRollTable(): Promise<void>;
    addToRollTable(): Promise<void>;
}
