import { CompendiumBrowser } from "../browser.ts";
import { ContentTabName } from "../data.ts";
import { CompendiumBrowserTab } from "./base.svelte.ts";
import { CompendiumBrowserIndexData, HazardFilters } from "./data.ts";

export declare class CompendiumBrowserHazardTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: HazardFilters;
    searchFields: string[];
    storeFields: string[];
    protected index: string[];
    constructor(browser: CompendiumBrowser);
    get isGMOnly(): boolean;
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): HazardFilters;
}
