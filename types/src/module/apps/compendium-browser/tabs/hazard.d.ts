import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { HazardFilters } from "./data";
export declare class CompendiumBrowserHazardTab extends CompendiumBrowserTab {
    filterData: HazardFilters;
    protected index: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumIndexData): boolean;
    protected prepareFilterData(): void;
}
