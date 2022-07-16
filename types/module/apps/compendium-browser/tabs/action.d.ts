import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { ActionFilters } from "./data";
export declare class CompendiumBrowserActionTab extends CompendiumBrowserTab {
    filterData: ActionFilters;
    protected index: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumIndexData): boolean;
    protected prepareFilterData(): void;
}
