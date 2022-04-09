/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemPF2e } from "@item";
import { ItemSheetDataPF2e } from "./data-types";
export declare class ItemSheetPF2e<TItem extends ItemPF2e> extends ItemSheet<TItem> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<any>;
    /** An alternative to super.getData() for subclasses that don't need this class's `getData` */
    protected getBaseData(options?: Partial<DocumentSheetOptions>): ItemSheetDataPF2e<TItem>;
    protected onTagSelector(event: JQuery.TriggeredEvent): void;
    /**
     * Get NPC attack effect options
     */
    protected getAttackEffectOptions(): Record<string, string>;
    private addDamageRoll;
    private deleteDamageRoll;
    protected _canDragDrop(_selector: string): boolean;
    activateListeners($html: JQuery): void;
    protected _getSubmitData(updateData?: Record<string, unknown>): Record<string, unknown>;
    /** Hide the sheet-config button unless there is more than one sheet option. */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
