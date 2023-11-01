import { ContentTabName } from "../data.ts";
import { CompendiumBrowser } from "../index.ts";
import { CompendiumBrowserTab } from "./base.ts";
import { CompendiumBrowserIndexData, HazardFilters } from "./data.ts";
export declare class CompendiumBrowserHazardTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: HazardFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    protected index: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): HazardFilters;
}
