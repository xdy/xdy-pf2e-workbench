/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemPF2e } from "@item";
import { RuleElementSource } from "@module/rules";
import type * as TinyMCE from "tinymce";
import { ItemSheetDataPF2e } from "./data-types";
export declare class ItemSheetPF2e<TItem extends ItemPF2e> extends ItemSheet<TItem> {
    static get defaultOptions(): DocumentSheetOptions;
    /** Maintain selected rule element at the sheet level (do not persist) */
    private selectedRuleElementType;
    /** If we are currently editing an RE, this is the index */
    private editingRuleElementIndex;
    private ruleElementForms;
    get editingRuleElement(): RuleElementSource | null;
    get validTraits(): Record<string, string> | null;
    /** An alternative to super.getData() for subclasses that don't need this class's `getData` */
    getData(options?: Partial<DocumentSheetOptions>): Promise<ItemSheetDataPF2e<TItem>>;
    protected onTagSelector(anchor: HTMLAnchorElement): void;
    /** Get NPC attack effect options */
    protected getAttackEffectOptions(): Record<string, string>;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    activateListeners($html: JQuery): void;
    /** When tabs are changed, change visibility of elements such as the sidebar */
    protected _onChangeTab(event: MouseEvent, tabs: Tabs, active: string): void;
    /** Internal function to update the sidebar visibility based on the current tab */
    private updateSidebarVisibility;
    /** Ensure the source description is edited rather than a prepared one */
    activateEditor(name: string, options?: Partial<TinyMCE.EditorOptions>, initialContent?: string): Promise<TinyMCE.Editor>;
    protected _getSubmitData(updateData?: Record<string, unknown>): Record<string, unknown>;
    /** Hide the sheet-config button unless there is more than one sheet option. */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    protected _canDragDrop(_selector: string): boolean;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    /** Overriden _render to maintain focus on tagify elements */
    protected _render(force?: boolean, options?: RenderOptions): Promise<void>;
}
