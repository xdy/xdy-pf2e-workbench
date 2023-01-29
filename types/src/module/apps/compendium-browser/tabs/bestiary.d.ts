import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { BestiaryFilters, CompendiumBrowserIndexData } from "./data";
export declare class CompendiumBrowserBestiaryTab extends CompendiumBrowserTab {
    protected index: string[];
    filterData: BestiaryFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): void;
}
