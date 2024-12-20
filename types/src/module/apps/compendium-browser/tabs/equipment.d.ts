import { CompendiumBrowser } from "../browser.ts";
import { ContentTabName } from "../data.ts";
import { CompendiumBrowserTab } from "./base.svelte.ts";
import { CompendiumBrowserIndexData, EquipmentFilters, RangesInputData } from "./data.ts";

export declare class CompendiumBrowserEquipmentTab extends CompendiumBrowserTab {
    #private;
    tabName: ContentTabName;
    tabLabel: string;
    filterData: EquipmentFilters;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    parseRangeFilterInput(name: string, lower: string, upper: string): RangesInputData["values"];
    protected prepareFilterData(): EquipmentFilters;
}
