import { ContentTabName } from "../data.ts";
import { CompendiumBrowser } from "../index.ts";
import { CompendiumBrowserTab } from "./base.ts";
import { CompendiumBrowserIndexData, SpellFilters } from "./data.ts";
export declare class CompendiumBrowserSpellTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: SpellFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(indexData: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): SpellFilters;
}
