import { CompendiumBrowser } from "..";
import { BaseFilterData, CheckBoxOptions } from "./data";
import { TabName } from "../data";
export declare abstract class CompendiumBrowserTab {
    /** A reference to the parent CompendiumBrowser */
    protected browser: CompendiumBrowser;
    /** An unmodified copy of this.filterData */
    protected defaultFilterData: BaseFilterData;
    /** The full CompendiumIndex of this tab */
    protected indexData: CompendiumIndexData[];
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
    constructor(browser: CompendiumBrowser, tabName: Exclude<TabName, "settings">);
    /** Initialize this this tab */
    init(): Promise<void>;
    /** Filter indexData and return slice based on current scrollLimit */
    getIndexData(): CompendiumIndexData[];
    /** Reset all filters */
    resetFilters(): void;
    /** Load and prepare the compendium index and set filter options */
    protected loadData(): Promise<void>;
    /** Prepare the the filterData object of this tab */
    protected prepareFilterData(): void;
    /** Filter indexData */
    protected filterIndexData(_entry: CompendiumIndexData): boolean;
    /** Sort result array by name, level or price */
    protected sortResult(result: CompendiumIndexData[]): CompendiumIndexData[];
    /** Check if an array includes any keys of another array */
    protected arrayIncludes(array: string[], other: string[]): boolean;
    /** Generates a localized and sorted CheckBoxOptions object from config data */
    protected generateCheckboxOptions(configData: Record<string, string>, sort?: boolean): CheckBoxOptions;
    /** Generates a sorted CheckBoxOptions object from a sources Set */
    protected generateSourceCheckboxOptions(sources: Set<string>): CheckBoxOptions;
    /** Provide a best-effort sort of an object (e.g. CONFIG.PF2E.monsterTraits) */
    protected sortedConfig(obj: Record<string, string>): {
        [k: string]: string;
    };
    /** Ensure all index fields are present in the index data */
    protected hasAllIndexFields(data: CompendiumIndexData, indexFields: string[]): boolean;
}
