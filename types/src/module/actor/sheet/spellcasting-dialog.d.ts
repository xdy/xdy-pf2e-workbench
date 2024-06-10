import type { CreaturePF2e } from "@actor";
import type { AttributeString } from "@actor/types.ts";
import { SpellcastingEntryPF2e } from "@item";
import type { SpellcastingEntrySystemSource } from "@item/spellcasting-entry/data.ts";
/** Dialog to create or edit spellcasting entries. It works on a clone of spellcasting entry, but will not persist unless the changes are accepted */
declare class SpellcastingCreateAndEditDialog extends FormApplication<SpellcastingEntryPF2e<CreaturePF2e>> {
    #private;
    constructor(object: SpellcastingEntryPF2e<CreaturePF2e>, options?: Partial<FormApplicationOptions>);
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<SpellcastingCreateAndEditDialogSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    private updateAndClose;
}
interface SpellcastingCreateAndEditDialogSheetData extends FormApplicationData<SpellcastingEntryPF2e<CreaturePF2e>> {
    actor: CreaturePF2e;
    system: SpellcastingEntrySystemSource;
    magicTraditions: typeof CONFIG.PF2E.magicTraditions;
    statistics: {
        slug: string;
        label: string;
    }[];
    spellcastingTypes: Partial<typeof CONFIG.PF2E.preparationType>;
    attributes: typeof CONFIG.PF2E.abilities;
    isAttributeConfigurable: boolean;
    selectedAttribute: AttributeString;
    autoHeightenLevels: Record<string, string>;
    validItemTypes: Record<string, string>;
}
declare function createSpellcastingDialog(object: CreaturePF2e | SpellcastingEntryPF2e<CreaturePF2e>): Promise<SpellcastingCreateAndEditDialog>;
export { createSpellcastingDialog };
