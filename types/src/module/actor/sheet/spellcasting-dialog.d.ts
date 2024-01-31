import type { ActorPF2e } from "@actor";
import { AttributeString } from "@actor/types.ts";
import { SpellcastingEntryPF2e } from "@item";
import { SpellcastingEntrySystemSource } from "@item/spellcasting-entry/data.ts";
/** Dialog to create or edit spellcasting entries. It works on a clone of spellcasting entry, but will not persist unless the changes are accepted */
declare class SpellcastingCreateAndEditDialog extends FormApplication<SpellcastingEntryPF2e<ActorPF2e>> {
    #private;
    constructor(object: SpellcastingEntryPF2e<ActorPF2e>, options?: Partial<FormApplicationOptions>);
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<SpellcastingCreateAndEditDialogSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    private updateAndClose;
}
interface SpellcastingCreateAndEditDialogSheetData extends FormApplicationData<SpellcastingEntryPF2e<ActorPF2e>> {
    actor: ActorPF2e;
    system: SpellcastingEntrySystemSource;
    magicTraditions: typeof CONFIG.PF2E.magicTraditions;
    statistics: {
        slug: string;
        label: string;
    }[];
    spellcastingTypes: Omit<typeof CONFIG.PF2E.preparationType, "ritual">;
    attributes: typeof CONFIG.PF2E.abilities;
    isAttributeConfigurable: boolean;
    selectedAttribute: AttributeString;
}
declare function createSpellcastingDialog(object: ActorPF2e | SpellcastingEntryPF2e<ActorPF2e>): Promise<SpellcastingCreateAndEditDialog>;
export { createSpellcastingDialog };
