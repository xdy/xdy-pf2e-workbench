import { CompendiumBrowser } from "..";
import { CompendiumBrowserTab } from "./base";
import { SpellFilters } from "./data";
export declare class CompendiumBrowserSpellTab extends CompendiumBrowserTab {
    filterData: SpellFilters;
    templatePath: string;
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumIndexData): boolean;
    protected prepareFilterData(): void;
}
