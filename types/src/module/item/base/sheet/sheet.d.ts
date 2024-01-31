/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ItemPF2e } from "@item";
import { Rarity } from "@module/data.ts";
import { RuleElementSource } from "@module/rules/index.ts";
import { SheetOptions, TraitTagifyEntry } from "@module/sheet/helpers.ts";
import type * as TinyMCE from "tinymce";
declare class ItemSheetPF2e<TItem extends ItemPF2e> extends ItemSheet<TItem, ItemSheetOptions> {
    #private;
    constructor(item: TItem, options?: Partial<ItemSheetOptions>);
    static get defaultOptions(): ItemSheetOptions;
    get editingRuleElement(): RuleElementSource | null;
    protected get validTraits(): Record<string, string>;
    /** An alternative to super.getData() for subclasses that don't need this class's `getData` */
    getData(options?: Partial<ItemSheetOptions>): Promise<ItemSheetDataPF2e<TItem>>;
    protected onTagSelector(anchor: HTMLAnchorElement): void;
    /** Get NPC attack effect options */
    protected getAttackEffectOptions(): Record<string, string>;
    activateEditor(name: string, options?: EditorCreateOptions, initialContent?: string): Promise<TinyMCE.Editor | ProseMirror.EditorView>;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    activateListeners($html: JQuery): void;
    protected _getSubmitData(updateData?: Record<string, unknown> | null): Record<string, unknown>;
    /** Add button to refresh from compendium if setting is enabled. */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    protected _canDragDrop(_selector: string): boolean;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown> | false>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    /** Overriden _render to maintain focus on tagify elements */
    protected _render(force?: boolean, options?: RenderOptions): Promise<void>;
}
interface ItemSheetDataPF2e<TItem extends ItemPF2e> extends ItemSheetData<TItem> {
    /** The item type label that shows at the top right (for example, "Feat" for "Feat 6") */
    itemType: string | null;
    showTraits: boolean;
    /** The sidebar's current title */
    sidebarTitle: string;
    sidebarTemplate: string | null;
    detailsTemplate: string;
    item: TItem;
    data: TItem["system"];
    fieldIdPrefix: string;
    enrichedContent: Record<string, string>;
    isPhysical: boolean;
    user: {
        isGM: boolean;
    };
    enabledRulesUI: boolean;
    ruleEditing: boolean;
    rarity: Rarity | null;
    rarities: typeof CONFIG.PF2E.rarityTraits;
    traits: SheetOptions | null;
    traitTagifyData: TraitTagifyEntry[] | null;
    rules: {
        selection: {
            selected: string | null;
            types: Record<string, string>;
        };
        elements: {
            template: string;
        }[];
    };
    /** Lore only, will be removed later */
    proficiencyRanks: typeof CONFIG.PF2E.proficiencyLevels;
}
interface ItemSheetOptions extends DocumentSheetOptions {
    hasSidebar: boolean;
}
export { ItemSheetPF2e };
export type { ItemSheetDataPF2e, ItemSheetOptions };
