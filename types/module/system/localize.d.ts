import MainTranslations from "static/lang/en.json";
import RETranslations from "static/lang/re-en.json";
declare type TranslationsPF2e = Record<string, TranslationDictionaryValue> & typeof MainTranslations & typeof RETranslations;
export declare class LocalizePF2e {
    static ready: boolean;
    private static _translations;
    static get translations(): TranslationsPF2e;
}
export {};
