import { CompendiumBrowser } from "..";
import { BaseFilterData, CheckboxOptions, CompendiumBrowserIndexData, RangesData } from "./data";
import { TabName } from "../data";
import MiniSearch from "minisearch";
export declare abstract class CompendiumBrowserTab {
    #private;
    /** A reference to the parent CompendiumBrowser */
    protected browser: CompendiumBrowser;
    /** An unmodified copy of this.filterData */
    defaultFilterData: BaseFilterData;
    /** The full CompendiumIndex of this tab */
    protected indexData: CompendiumBrowserIndexData[];
    /** Is this tab initialized? */
    isInitialized: boolean;
    /** The filter schema for this tab; The tabs filters are rendered based on this.*/
    filterData: BaseFilterData;
    /** The total count of items in the currently filtered index */
    totalItemCount: number;
    /** The initial display limit for this tab; Scrolling is currently hardcoded to +100 */
    scrollLimit: number;
    /** The name of this tab */
    tabName: Exclude<TabName, "settings">;
    /** The path to the result list template of this tab */
    abstract templatePath: string;
    /** Minisearch */
    searchEngine: MiniSearch;
    /** Names of the document fields to be indexed. */
    searchFields: string[];
    /** Names of fields to store, so that search results would include them.
     *  By default none, so resuts would only contain the id field. */
    storeFields: string[];
    constructor(browser: CompendiumBrowser, tabName: Exclude<TabName, "settings">);
    /** Initialize this this tab */
    init(): Promise<void>;
    /** Filter indexData and return slice based on current scrollLimit */
    getIndexData(start: number): CompendiumBrowserIndexData[];
    /** Reset all filters */
    resetFilters(): void;
    /** Load and prepare the compendium index and set filter options */
    protected loadData(): Promise<void>;
    /** Prepare the the filterData object of this tab */
    protected prepareFilterData(): void;
    /** Filter indexData */
    protected filterIndexData(_entry: CompendiumBrowserIndexData): boolean;
    renderResults(start: number): Promise<HTMLLIElement[]>;
    /** Sort result array by name, level or price */
    protected sortResult(result: CompendiumBrowserIndexData[]): CompendiumBrowserIndexData[];
    /** Return new range filter values based on input */
    parseRangeFilterInput(_name: string, lower: string, upper: string): RangesData["values"];
    /** Check if an array includes any keys of another array */
    protected arrayIncludes(array: string[], other: string[]): boolean;
    /** Generates a localized and sorted CheckBoxOptions object from config data */
    protected generateCheckboxOptions(configData: Record<string, string>, sort?: boolean): CheckboxOptions;
    protected generateMultiselectOptions<T extends string>(optionsRecord: Record<T, string>, sort?: boolean): {
        value: T;
        label: string;
    }[];
    /** Generates a sorted CheckBoxOptions object from a sources Set */
    protected generateSourceCheckboxOptions(sources: Set<string>): CheckboxOptions;
    /** Provide a best-effort sort of an object (e.g. CONFIG.PF2E.monsterTraits) */
    protected sortedConfig(obj: Record<string, string>): {
        [k: string]: string;
    };
    /** Ensure all index fields are present in the index data */
    protected hasAllIndexFields(data: CompendiumIndexData, indexFields: string[]): boolean;
}
