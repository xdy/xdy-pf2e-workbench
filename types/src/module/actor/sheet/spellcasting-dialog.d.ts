/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { AbilityString } from "@actor/data";
import { SpellcastingEntryPF2e } from "@item";
import { MagicTradition, PreparationType } from "@item/spellcasting-entry/data";
interface SpellcastingDialogOptions {
    entry?: SpellcastingEntryPF2e;
    callback: (result: SpellcastingDialogResult, $html: JQuery) => void;
}
export interface SpellcastingDialogResult {
    spellcastingType: PreparationType;
    tradition: MagicTradition | "";
    ability: AbilityString | "";
    flexible: boolean;
}
declare class SpellcastingCreateAndEditDialog extends Application {
    private dialogOptions;
    private entry;
    result: SpellcastingDialogResult;
    constructor(options: Partial<ApplicationOptions>, dialogOptions: SpellcastingDialogOptions);
    static get defaultOptions(): ApplicationOptions;
    activateListeners($html: JQuery): void;
    getData(): {
        magicTraditions: Record<"arcane" | "divine" | "occult" | "primal", string>;
        spellcastingTypes: {
            prepared: string;
            spontaneous: string;
            innate: string;
            focus: string;
            ritual: string;
        };
        entry: SpellcastingEntryPF2e | undefined;
        data: SpellcastingDialogResult;
        abilities: {
            [k: string]: string;
        };
    };
}
export declare function createSpellcastingDialog(event: JQuery.ClickEvent, options: SpellcastingDialogOptions): Promise<SpellcastingCreateAndEditDialog>;
export {};
