import { CompendiumBrowser } from "..";
import { ContentTabName } from "../data";
import { CompendiumBrowserTab } from "./base";
import { CompendiumBrowserIndexData, FeatFilters } from "./data";
export declare class CompendiumBrowserFeatTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: FeatFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): FeatFilters;
}
