/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { TabData, PackInfo, TabName, BrowserTab } from "./data";
import { InitialActionFilters, InitialBestiaryFilters, InitialEquipmentFilters, InitialFeatFilters, InitialHazardFilters, InitialSpellFilters } from "./tabs/data";
import { SpellcastingEntryPF2e } from "@item";
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
    #private;
    settings: CompendiumBrowserSettings;
    dataTabsList: readonly ["action", "bestiary", "equipment", "feat", "hazard", "spell"];
    tabs: Record<Exclude<TabName, "settings">, BrowserTab>;
    packLoader: PackLoader;
    activeTab: TabName;
    navigationTab: Tabs;
    /** An initial filter to be applied upon loading a tab */
    private initialFilter;
    constructor(options?: {});
    get title(): string;
    static get defaultOptions(): ApplicationOptions & {
        id: string;
        classes: never[];
        template: string;
        width: number;
        height: number;
        resizable: boolean;
        dragDrop: {
            dragSelector: string;
        }[];
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
        scrollY: string[];
    };
    /** Reset initial filtering */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    initCompendiumList(): void;
    hookTab(): void;
    openTab(tab: "action", filter?: InitialActionFilters): Promise<void>;
    openTab(tab: "bestiary", filter?: InitialBestiaryFilters): Promise<void>;
    openTab(tab: "equipment", filter?: InitialEquipmentFilters): Promise<void>;
    openTab(tab: "feat", filter?: InitialFeatFilters): Promise<void>;
    openTab(tab: "hazard", filter?: InitialHazardFilters): Promise<void>;
    openTab(tab: "spell", filter?: InitialSpellFilters): Promise<void>;
    openTab(tab: "settings"): Promise<void>;
    openSpellTab(entry: SpellcastingEntryPF2e, level?: number): Promise<void>;
    loadTab(tab: TabName): Promise<void>;
    private processInitialFilters;
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
    injectActorDirectory(): void;
    getData(): {
        user: Active<import("../../user/document").UserPF2e>;
        settings: CompendiumBrowserSettings;
        scrollLimit?: undefined;
    } | {
        [x: string]: number | Active<import("../../user/document").UserPF2e> | {
            filterData: import("./tabs/data").ActionFilters | import("./tabs/data").BestiaryFilters | import("./tabs/data").EquipmentFilters | import("./tabs/data").FeatFilters | import("./tabs/data").HazardFilters | import("./tabs/data").SpellFilters;
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
