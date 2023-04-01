/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActionTrait } from "@item/action";
import { ActionType } from "@item/data/base";
import { BaseSpellcastingEntry } from "@item/spellcasting-entry";
import { BrowserTabs, PackInfo, TabData, TabName } from "./data";
import { ActionFilters, BestiaryFilters, EquipmentFilters, FeatFilters, HazardFilters, SpellFilters } from "./tabs/data";
declare class PackLoader {
    loadedPacks: {
        Actor: Record<string, {
            pack: CompendiumCollection;
            index: CompendiumIndex;
        } | undefined>;
        Item: Record<string, {
            pack: CompendiumCollection;
            index: CompendiumIndex;
        } | undefined>;
    };
    loadPacks(documentType: "Actor" | "Item", packs: string[], indexFields: string[]): AsyncGenerator<{
        pack: CompendiumCollection<CompendiumDocument>;
        index: CompendiumIndex;
    } | {
        pack: CompendiumCollection<CompendiumDocument>;
        index: CompendiumIndex;
    }, void, unknown>;
    /** Set art provided by a module if any is available */
    private setModuleArt;
}
declare class CompendiumBrowser extends Application {
    settings: CompendiumBrowserSettings;
    dataTabsList: readonly ["action", "bestiary", "equipment", "feat", "hazard", "spell"];
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
    openActionTab(typeFilters: ActionType[], traitFilters: ActionTrait[]): Promise<void>;
    openSpellTab(entry: BaseSpellcastingEntry, maxLevel?: number): Promise<void>;
    loadTab(tabName: TabName): Promise<void>;
    loadedPacks(tab: TabName): string[];
    activateListeners($html: JQuery): void;
    /**
     * Append new results to the result list
     * @param options Render options
     * @param options.list The result list HTML element
     * @param options.start The index position to start from
     * @param options.replace Replace the current list with the new results?
     */
    private renderResultList;
    /** Activate click listeners on loaded actors and items */
    private activateResultListeners;
    private takePhysicalItem;
    private buyPhysicalItem;
    private getPhysicalItem;
    protected _canDragStart(): boolean;
    protected _canDragDrop(): boolean;
    /** Set drag data and lower opacity of the application window to reveal any tokens */
    protected _onDragStart(event: ElementDragEvent): void;
    protected _onDragOver(event: ElementDragEvent): void;
    getData(): {
        user: Active<import("../../user/document").UserPF2e>;
        settings: CompendiumBrowserSettings;
        scrollLimit?: undefined;
    } | {
        [x: string]: number | Active<import("../../user/document").UserPF2e> | {
            filterData: EquipmentFilters | ActionFilters | BestiaryFilters | FeatFilters | HazardFilters | SpellFilters;
        };
        user: Active<import("../../user/document").UserPF2e>;
        scrollLimit: number;
        settings?: undefined;
    } | {
        user: Active<import("../../user/document").UserPF2e>;
        settings?: undefined;
        scrollLimit?: undefined;
    };
    private resetFilters;
    private clearScrollLimit;
}
type CompendiumBrowserSettings = Omit<TabData<Record<string, PackInfo | undefined>>, "settings">;
export { CompendiumBrowser, CompendiumBrowserSettings };
