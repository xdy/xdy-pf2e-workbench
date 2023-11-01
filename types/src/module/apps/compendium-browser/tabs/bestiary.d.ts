import { ContentTabName } from "../data.ts";
import { CompendiumBrowser } from "../index.ts";
import { CompendiumBrowserTab } from "./base.ts";
import { BestiaryFilters, CompendiumBrowserIndexData } from "./data.ts";
export declare class CompendiumBrowserBestiaryTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: BestiaryFilters;
    templatePath: string;
    protected index: string[];
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): BestiaryFilters;
}
