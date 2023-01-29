import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { CompendiumBrowserIndexData, EquipmentFilters, RangesData } from "./data";
export declare class CompendiumBrowserEquipmentTab extends CompendiumBrowserTab {
    filterData: EquipmentFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    parseRangeFilterInput(name: string, lower: string, upper: string): RangesData["values"];
    protected prepareFilterData(): void;
}
