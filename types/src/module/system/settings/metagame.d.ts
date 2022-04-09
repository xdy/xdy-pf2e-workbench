import { PartialSettingsData, SettingsMenuPF2e } from "./menu";
declare type ConfigPF2eListName = typeof MetagameSettings.SETTINGS[number];
export declare class MetagameSettings extends SettingsMenuPF2e {
    static readonly namespace = "metagame";
    static readonly SETTINGS: readonly ["showDC", "showResults", "tokenSetsNameVisibility", "secretDamage", "secretCondition", "partyVision"];
    protected static get settings(): Record<ConfigPF2eListName, PartialSettingsData>;
}
export {};
