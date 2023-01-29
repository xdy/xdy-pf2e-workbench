import { ActorPF2e } from "@actor";
import { SpellcastingEntryPF2e } from "@item";
import { SpellcastingEntrySystemData } from "@item/spellcasting-entry/data";
/** Dialog to create or edit spellcasting entries. It works on a clone of spellcasting entry, but will not persist unless the changes are accepted */
declare class SpellcastingCreateAndEditDialog extends FormApplication<Embedded<SpellcastingEntryPF2e>> {
    #private;
    private actor;
    constructor(object: ActorPF2e | Embedded<SpellcastingEntryPF2e>, options: Partial<FormApplicationOptions>);
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<SpellcastingCreateAndEditDialogSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    private updateAndClose;
}
interface SpellcastingCreateAndEditDialogSheetData extends FormApplicationData<Embedded<SpellcastingEntryPF2e>> {
    actor: ActorPF2e;
    data: SpellcastingEntrySystemData;
    magicTraditions: ConfigPF2e["PF2E"]["magicTraditions"];
    spellcastingTypes: ConfigPF2e["PF2E"]["preparationType"];
    abilities: ConfigPF2e["PF2E"]["abilities"];
    hasAbility: boolean;
}
export declare function createSpellcastingDialog(event: MouseEvent, object: ActorPF2e | Embedded<SpellcastingEntryPF2e>): Promise<SpellcastingCreateAndEditDialog>;
export {};
