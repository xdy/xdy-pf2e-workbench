/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { PartialSettingsData, SettingsMenuPF2e } from "../menu.ts";
import { CustomDamageData, HomebrewElementsSheetData, HomebrewKey, HomebrewTag, HomebrewTraitKey } from "./data.ts";
import "@yaireo/tagify/src/tagify.scss";
declare class HomebrewElements extends SettingsMenuPF2e {
    #private;
    static readonly namespace = "homebrew";
    static get SETTINGS(): string[];
    static get defaultOptions(): FormApplicationOptions;
    protected static get traitSettings(): Record<HomebrewTraitKey, PartialSettingsData>;
    protected static get settings(): Record<HomebrewKey, PartialSettingsData>;
    activateListeners($form: JQuery<HTMLFormElement>): void;
    getData(): Promise<HomebrewElementsSheetData>;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    protected _getSubmitData(updateData?: Record<string, unknown> | undefined): Record<string, unknown>;
    protected _updateObject(event: Event, data: Record<HomebrewTraitKey, HomebrewTag[]>): Promise<void>;
    onInit(): void;
}
type HomebrewSubmitData = {
    damageTypes: CustomDamageData[];
} & Record<string, unknown>;
interface HomebrewElements extends SettingsMenuPF2e {
    constructor: typeof HomebrewElements;
    cache: HomebrewSubmitData;
}
export { HomebrewElements };
