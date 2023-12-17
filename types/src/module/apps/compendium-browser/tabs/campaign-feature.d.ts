import { ContentTabName } from "../data.ts";
import { CompendiumBrowser } from "../index.ts";
import { CompendiumBrowserTab } from "./base.ts";
import { CampaignFeatureFilters, CompendiumBrowserIndexData } from "./data.ts";
export declare class CompendiumBrowserCampaignFeaturesTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: CampaignFeatureFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): CampaignFeatureFilters;
}
