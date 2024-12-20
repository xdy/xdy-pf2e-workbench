import { CompendiumBrowser } from "../browser.ts";
import { ContentTabName } from "../data.ts";
import { CompendiumBrowserTab } from "./base.svelte.ts";
import { BestiaryFilters, CompendiumBrowserIndexData } from "./data.ts";

export declare class CompendiumBrowserBestiaryTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: BestiaryFilters;
    protected index: string[];
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    get isGMOnly(): boolean;
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): BestiaryFilters;
}
