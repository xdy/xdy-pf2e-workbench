/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { PartialSettingsData, SettingsMenuPF2e } from "../menu";
import "@yaireo/tagify/src/tagify.scss";
import { CustomDamageData, HomebrewElementsSheetData, HomebrewKey, HomebrewTag, HomebrewTraitKey } from "./data";
declare class HomebrewElements extends SettingsMenuPF2e {
    #private;
    static readonly namespace = "homebrew";
    /** Whether this is the first time the homebrew tags will have been injected into CONFIG and actor derived data */
    private initialRefresh;
    private damageManager;
    static get SETTINGS(): string[];
    static get defaultOptions(): FormApplicationOptions & {
        title: string;
        id: string;
        template: string;
        width: number;
        height: string;
        tabs: {
            navSelector: string;
            contentSelector: string;
        }[];
        closeOnSubmit: boolean;
        submitOnChange: boolean;
    } & {
        template: string;
    };
    protected static get traitSettings(): Record<"languages" | "equipmentTraits" | "weaponTraits" | "creatureTraits" | "featTraits" | "magicSchools" | "spellTraits" | "weaponCategories" | "weaponGroups" | "baseWeapons", PartialSettingsData>;
    protected static get settings(): Record<HomebrewKey, PartialSettingsData>;
    activateListeners($form: JQuery<HTMLFormElement>): void;
    getData(): Promise<HomebrewElementsSheetData>;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    protected _getSubmitData(updateData?: Record<string, unknown> | undefined): Record<string, unknown>;
    protected _updateObject(event: Event, data: Record<HomebrewTraitKey, HomebrewTag[]>): Promise<void>;
    /** Prepare and run a migration for each set of tag deletions from a tag map */
    private processDeletions;
    onSetup(): void;
    private getConfigRecord;
    private updateConfigRecords;
}
type HomebrewSubmitData = {
    damageTypes: CustomDamageData[];
} & Record<string, unknown>;
interface HomebrewElements extends SettingsMenuPF2e {
    constructor: typeof HomebrewElements;
    cache: HomebrewSubmitData;
}
export { HomebrewElements };
