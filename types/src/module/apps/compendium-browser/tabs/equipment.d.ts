import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { EquipmentFilters } from "./data";
export declare class CompendiumBrowserEquipmentTab extends CompendiumBrowserTab {
    filterData: EquipmentFilters;
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumIndexData): boolean;
    protected prepareFilterData(): void;
}
