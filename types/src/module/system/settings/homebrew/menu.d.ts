/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import "@yaireo/tagify/src/tagify.scss";
import { PartialSettingsData, SettingsMenuPF2e } from "../menu.ts";
import { CustomDamageData, HomebrewElementsSheetData, HomebrewKey, HomebrewTag, HomebrewTraitKey, LanguageNotCommon, LanguageSettings, LanguageSettingsSheetData } from "./data.ts";
import { ReservedTermsRecord } from "./helpers.ts";
declare class HomebrewElements extends SettingsMenuPF2e {
    #private;
    static readonly namespace = "homebrew";
    languagesManager: LanguagesManager;
    static get reservedTerms(): ReservedTermsRecord;
    static get SETTINGS(): string[];
    static get defaultOptions(): FormApplicationOptions;
    protected static campaignSettings: {
        campaignFeats: {
            name: string;
            hint: string;
            default: false;
            type: BooleanConstructor;
            onChange: (value: unknown) => void;
        };
        campaignType: {
            name: string;
            hint: string;
            default: string;
            choices: Record<string, string>;
            type: StringConstructor;
            onChange: () => Promise<void>;
        };
    };
    protected static get traitSettings(): Record<HomebrewTraitKey, PartialSettingsData>;
    protected static get settings(): Record<HomebrewKey, PartialSettingsData>;
    activateListeners($html: JQuery): void;
    getData(): Promise<HomebrewElementsSheetData>;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, options?: OnSubmitFormOptions): Promise<Record<string, unknown> | false>;
    protected _getSubmitData(updateData?: Record<string, unknown> | undefined): Record<string, unknown>;
    protected _updateObject(event: Event, data: Record<HomebrewTraitKey, HomebrewTag[]>): Promise<void>;
    onInit(): void;
}
/** A helper class for managing languages and their rarities */
declare class LanguagesManager {
    #private;
    /** The parent settings menu */
    menu: HomebrewElements;
    /** A separate list of module-provided languages */
    moduleLanguages: LanguageNotCommon[];
    constructor(menu: HomebrewElements);
    get data(): LanguageSettings;
    getSheetData(): LanguageSettingsSheetData;
    activateListeners(html: HTMLElement): void;
    /** Update the language rarities cache, adding and deleting from sets as necessary. */
    onChangeHomebrewLanguages(languages: HomebrewTag<"languages">[]): void;
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
