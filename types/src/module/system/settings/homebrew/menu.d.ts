/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { BaseWeaponType } from "@item/weapon/types";
import { PartialSettingsData, SettingsMenuPF2e } from "../menu";
import "@yaireo/tagify/src/tagify.scss";
export declare type ConfigPF2eHomebrewRecord = typeof HomebrewElements.SETTINGS[number];
export declare type HomebrewSettingsKey = `homebrew.${ConfigPF2eHomebrewRecord}`;
export interface HomebrewTag<T extends ConfigPF2eHomebrewRecord = ConfigPF2eHomebrewRecord> {
    id: T extends "baseWeapons" ? BaseWeaponType : T extends Exclude<ConfigPF2eHomebrewRecord, "baseWeapons"> ? keyof ConfigPF2e["PF2E"][T] : never;
    value: string;
}
export declare class HomebrewElements extends SettingsMenuPF2e {
    static readonly namespace = "homebrew";
    /** Whether this is the first time the homebrew tags will have been injected into CONFIG and actor derived data */
    private initialRefresh;
    static readonly SETTINGS: readonly ["creatureTraits", "featTraits", "languages", "magicSchools", "spellTraits", "weaponCategories", "weaponGroups", "baseWeapons", "weaponTraits", "equipmentTraits"];
    /** Homebrew elements from some of the above records are propagated to related records */
    private secondaryRecords;
    static get defaultOptions(): FormApplicationOptions & {
        title: string;
        id: string;
        template: string;
        width: number;
        height: string;
        closeOnSubmit: boolean;
    } & {
        template: string;
    };
    protected static get settings(): Record<ConfigPF2eHomebrewRecord, PartialSettingsData>;
    activateListeners($form: JQuery<HTMLFormElement>): void;
    protected _getSubmitData(updateData?: Record<string, unknown>): Record<string, unknown>;
    protected _updateObject(_event: Event, data: Record<ConfigPF2eHomebrewRecord, HomebrewTag[]>): Promise<void>;
    /** Prepare and run a migration for each set of tag deletions from a tag map */
    private processDeletions;
    /** Assign the homebrew elements to their respective `CONFIG.PF2E` objects */
    refreshTags(): void;
    /** Register homebrew elements stored in a prescribed location in module flags */
    registerModuleTags(): void;
    private getConfigRecord;
    private updateConfigRecords;
}
