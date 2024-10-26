/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import "@yaireo/tagify/dist/tagify.css";
import { PartialSettingsData, SettingsMenuPF2e } from "../menu.ts";
import {
    CustomDamageData,
    HomebrewElementsSheetData,
    HomebrewKey,
    HomebrewTag,
    HomebrewTraitKey,
    LanguageSettings,
    ModuleHomebrewData,
} from "./data.ts";
import { ReservedTermsRecord } from "./helpers.ts";
import { LanguagesManager } from "./languages.ts";

declare class HomebrewElements extends SettingsMenuPF2e {
    #private;
    static readonly namespace = "homebrew";
    languagesManager: LanguagesManager;
    static get reservedTerms(): ReservedTermsRecord;
    static get moduleData(): ModuleHomebrewData;
    static get SETTINGS(): string[];
    static get defaultOptions(): FormApplicationOptions;
    protected static get settings(): Record<HomebrewKey, PartialSettingsData>;
    activateListeners($html: JQuery): void;
    getData(): Promise<HomebrewElementsSheetData>;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, options?: OnSubmitFormOptions): Promise<Record<string, unknown> | false>;
    protected _getSubmitData(updateData?: Record<string, unknown> | undefined): Record<string, unknown>;
    protected _updateObject(event: Event, data: Record<HomebrewTraitKey, HomebrewTag[]>): Promise<void>;
    onInit(): void;
}
type HomebrewSubmitData = {
    damageTypes: CustomDamageData[];
    languages: HomebrewTag<"languages">[];
    languageRarities: LanguageSettings;
} & Record<string, unknown> & {
    clear(): void;
};
interface HomebrewElements extends SettingsMenuPF2e {
    constructor: typeof HomebrewElements;
    cache: HomebrewSubmitData;
}
export { HomebrewElements };
