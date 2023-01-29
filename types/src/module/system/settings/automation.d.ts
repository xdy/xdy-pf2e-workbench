import { PartialSettingsData, SettingsMenuPF2e } from "./menu";
type ConfigPF2eListName = typeof AutomationSettings.SETTINGS[number];
export declare class AutomationSettings extends SettingsMenuPF2e {
    static readonly namespace = "automation";
    static readonly SETTINGS: readonly ["rulesBasedVision", "iwr", "effectExpiration", "removeExpiredEffects", "flankingDetection", "lootableNPCs"];
    protected static get settings(): Record<ConfigPF2eListName, PartialSettingsData>;
}
export {};
