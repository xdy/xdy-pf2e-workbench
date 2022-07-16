import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { BestiaryFilters } from "./data";
export declare class CompendiumBrowserBestiaryTab extends CompendiumBrowserTab {
    protected index: string[];
    filterData: BestiaryFilters;
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumIndexData): boolean;
    protected prepareFilterData(): void;
}
