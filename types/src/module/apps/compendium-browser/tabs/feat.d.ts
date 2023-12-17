import { ContentTabName } from "../data.ts";
import { CompendiumBrowser } from "../index.ts";
import { CompendiumBrowserTab } from "./base.ts";
import { CompendiumBrowserIndexData, FeatFilters, MultiselectData } from "./data.ts";
export declare class CompendiumBrowserFeatTab extends CompendiumBrowserTab {
    #private;
    tabName: ContentTabName;
    filterData: FeatFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterTraits(traits: string[], selected: MultiselectData["selected"], condition: MultiselectData["conjunction"]): boolean;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): FeatFilters;
}
