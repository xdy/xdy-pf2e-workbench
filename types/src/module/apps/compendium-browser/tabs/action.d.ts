import { CompendiumBrowser } from "..";
import { ContentTabName } from "../data";
import { CompendiumBrowserTab } from "./base";
import { ActionFilters, CompendiumBrowserIndexData } from "./data";
export declare class CompendiumBrowserActionTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: ActionFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    protected index: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): ActionFilters;
}
