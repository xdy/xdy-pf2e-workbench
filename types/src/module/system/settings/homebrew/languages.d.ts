import { HomebrewTag, LanguageNotCommon, LanguageSettings, LanguageSettingsSheetData } from "./data.ts";
import { HomebrewElements } from "./menu.ts";
/** A helper class for managing languages and their rarities */
export declare class LanguagesManager {
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
