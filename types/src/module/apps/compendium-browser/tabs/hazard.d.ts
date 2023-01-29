import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { CompendiumBrowserIndexData, HazardFilters } from "./data";
export declare class CompendiumBrowserHazardTab extends CompendiumBrowserTab {
    filterData: HazardFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    protected index: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): void;
}
