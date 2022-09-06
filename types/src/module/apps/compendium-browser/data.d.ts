import * as browserTabs from "./tabs";
export interface PackInfo {
    load: boolean;
    name: string;
}
export declare type TabName = "action" | "bestiary" | "equipment" | "feat" | "hazard" | "spell" | "settings";
export declare type BrowserTab = InstanceType<typeof browserTabs[keyof typeof browserTabs]>;
export declare type TabData<T> = Record<TabName, T | null>;
export declare type CommonSortByOption = "name" | "level";
export declare type SortByOption = CommonSortByOption | "price";
export declare type SortDirection = "asc" | "desc";
