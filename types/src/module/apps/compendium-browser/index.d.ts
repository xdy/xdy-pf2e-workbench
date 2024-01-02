/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActionCategory, ActionTrait } from "@item/ability/index.ts";
import { ActionType } from "@item/base/data/index.ts";
import { BaseSpellcastingEntry } from "@item/spellcasting-entry/index.ts";
import type { UserPF2e } from "@module/user/document.ts";
import { BrowserTabs, PackInfo, SourceInfo, TabData, TabName } from "./data.ts";
import { PackLoader } from "./loader.ts";
import { ActionFilters, BestiaryFilters, EquipmentFilters, FeatFilters, HazardFilters, SpellFilters } from "./tabs/data.ts";
declare class CompendiumBrowser extends Application {
    #private;
    settings: CompendiumBrowserSettings;
    dataTabsList: readonly ["action", "bestiary", "campaignFeature", "equipment", "feat", "hazard", "spell"];
    navigationTab: Tabs;
    tabs: BrowserTabs;
    packLoader: PackLoader;
    activeTab: TabName;
    constructor(options?: {});
    get title(): string;
    static get defaultOptions(): ApplicationOptions;
    /** Reset initial filtering */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    hookTab(): Tabs;
    initCompendiumList(): void;
    openTab(name: "action", filter?: ActionFilters): Promise<void>;
    openTab(name: "bestiary", filter?: BestiaryFilters): Promise<void>;
    openTab(name: "equipment", filter?: EquipmentFilters): Promise<void>;
    openTab(name: "feat", filter?: FeatFilters): Promise<void>;
    openTab(name: "hazard", filter?: HazardFilters): Promise<void>;
    openTab(name: "spell", filter?: SpellFilters): Promise<void>;
    openTab(name: "settings"): Promise<void>;
    openActionTab(options: {
        types?: ActionType[];
        categories?: ActionCategory[];
        traits?: ActionTrait[];
    }): Promise<void>;
    openSpellTab(entry: BaseSpellcastingEntry, maxRank?: number, category?: string | null): Promise<void>;
    loadTab(tabName: TabName): Promise<void>;
    loadedPacks(tab: TabName): string[];
    loadedPacksAll(): string[];
    activateListeners($html: JQuery): void;
    protected _canDragStart(): boolean;
    protected _canDragDrop(): boolean;
    /** Set drag data and lower opacity of the application window to reveal any tokens */
    protected _onDragStart(event: DragEvent): void;
    protected _onDragOver(event: DragEvent): void;
    getData(): CompendiumBrowserSheetData;
}
type CompendiumBrowserSettings = Omit<TabData<Record<string, PackInfo | undefined>>, "settings">;
type CompendiumBrowserSourcesList = Record<string, SourceInfo | undefined>;
interface CompendiumBrowserSources {
    ignoreAsGM: boolean;
    showEmptySources: boolean;
    showUnknownSources: boolean;
    sources: CompendiumBrowserSourcesList;
}
interface CompendiumBrowserSheetData {
    user: Active<UserPF2e>;
    settings?: {
        settings: CompendiumBrowserSettings;
        sources: CompendiumBrowserSources;
    };
    scrollLimit?: number;
    showCampaign: boolean;
}
export { CompendiumBrowser };
export type { CompendiumBrowserSettings, CompendiumBrowserSources };
