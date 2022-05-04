import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { EquipmentFilters, RangesData } from "./data";
export declare class CompendiumBrowserEquipmentTab extends CompendiumBrowserTab {
    filterData: EquipmentFilters;
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumIndexData): boolean;
    parseRangeFilterInput(name: string, lower: string, upper: string): RangesData["values"];
    protected prepareFilterData(): void;
}
