import { ContentTabName } from "../data.ts";
import { CompendiumBrowser } from "../index.ts";
import { CompendiumBrowserTab } from "./base.ts";
import { CompendiumBrowserIndexData, EquipmentFilters, RangesInputData } from "./data.ts";
export declare class CompendiumBrowserEquipmentTab extends CompendiumBrowserTab {
    #private;
    tabName: ContentTabName;
    filterData: EquipmentFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    parseRangeFilterInput(name: string, lower: string, upper: string): RangesInputData["values"];
    protected prepareFilterData(): EquipmentFilters;
}
