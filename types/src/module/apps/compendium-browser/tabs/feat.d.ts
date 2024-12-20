import { CompendiumBrowser } from "../browser.ts";
import { ContentTabName } from "../data.ts";
import { CompendiumBrowserTab } from "./base.svelte.ts";
import { CompendiumBrowserIndexData, FeatFilters, TraitData } from "./data.ts";

export declare class CompendiumBrowserFeatTab extends CompendiumBrowserTab {
    #private;
    tabName: ContentTabName;
    tabLabel: string;
    filterData: FeatFilters;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterTraits(traits: string[], selected: TraitData["selected"], condition: TraitData["conjunction"]): boolean;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): FeatFilters;
}
