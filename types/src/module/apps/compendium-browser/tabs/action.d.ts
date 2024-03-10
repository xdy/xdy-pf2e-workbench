import { ContentTabName } from "../data.ts";
import { CompendiumBrowser } from "../index.ts";
import { CompendiumBrowserTab } from "./base.ts";
import { ActionFilters, CompendiumBrowserIndexData } from "./data.ts";
export declare class CompendiumBrowserActionTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: ActionFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): ActionFilters;
}
