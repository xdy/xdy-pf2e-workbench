/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { TabData, PackInfo, TabName, TabType } from "./data";
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
}
export declare class CompendiumBrowser extends Application {
    settings: Omit<TabData<Record<string, PackInfo | undefined>>, "settings">;
    dataTabsList: readonly ["action", "bestiary", "equipment", "feat", "hazard", "spell"];
    tabs: Record<Exclude<TabName, "settings">, TabType>;
    packLoader: PackLoader;
    activeTab: TabName;
    navigationTab: Tabs;
    /** An initial filter to be applied upon loading a tab */
    private initialFilter;
    private initialMaxLevel;
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
    _render(force?: boolean, options?: RenderOptions): Promise<void>;
    /** Reset initial filtering */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    private initCompendiumList;
    loadSettings(): void;
    hookTab(): void;
    openTab(tab: TabName, filter?: string[], maxLevel?: number): Promise<void>;
    loadTab(tab: TabName): Promise<void>;
    loadedPacks(tab: TabName): string[];
    activateListeners($html: JQuery): void;
    /** Activate click listeners on loaded actors and items */
    private activateResultListeners;
    private takePhysicalItem;
    private getPhysicalItem;
    protected _canDragStart(): boolean;
    protected _canDragDrop(): boolean;
    /** Set drag data and lower opacity of the application window to reveal any tokens */
    protected _onDragStart(event: ElementDragEvent): void;
    protected _onDragOver(event: ElementDragEvent): void;
    injectActorDirectory(): void;
    getData(): {
        user: Active<import("../../user").UserPF2e>;
        settings: Omit<TabData<Record<string, PackInfo | undefined>>, "settings">;
        scrollLimit?: undefined;
    } | {
        [x: string]: number | Active<import("../../user").UserPF2e> | {
            filterData: import("./tabs/data").ActionFilters | import("./tabs/data").BestiaryFilters | import("./tabs/data").EquipmentFilters | import("./tabs/data").FeatFilters | import("./tabs/data").HazardFilters | import("./tabs/data").SpellFilters;
            indexData: CompendiumIndexData[];
        };
        user: Active<import("../../user").UserPF2e>;
        scrollLimit: number;
        settings?: undefined;
    } | {
        user: Active<import("../../user").UserPF2e>;
        settings?: undefined;
        scrollLimit?: undefined;
    };
    private resetFilters;
    private clearScrollLimit;
}
export {};
