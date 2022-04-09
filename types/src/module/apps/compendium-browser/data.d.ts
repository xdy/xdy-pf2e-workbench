import { CompendiumBrowserActionTab, CompendiumBrowserBestiaryTab, CompendiumBrowserEquipmentTab, CompendiumBrowserFeatTab, CompendiumBrowserHazardTab, CompendiumBrowserSpellTab } from "./tabs/index";
export interface PackInfo {
    load: boolean;
    name: string;
}
export declare type TabName = "action" | "bestiary" | "equipment" | "feat" | "hazard" | "spell" | "settings";
export declare type TabType = CompendiumBrowserActionTab | CompendiumBrowserBestiaryTab | CompendiumBrowserEquipmentTab | CompendiumBrowserFeatTab | CompendiumBrowserHazardTab | CompendiumBrowserSpellTab;
export declare type TabData<T> = Record<TabName, T | null>;
export declare type SortByOption = "name" | "level" | "price";
export declare type SortDirection = "asc" | "desc";
