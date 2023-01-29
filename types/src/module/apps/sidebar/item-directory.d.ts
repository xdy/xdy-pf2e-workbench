/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
/** Extend ItemDirectory to show more information */
export declare class ItemDirectoryPF2e<TItem extends Item> extends ItemDirectory<TItem> {
    static get defaultOptions(): SidebarDirectoryOptions;
    getData(): Promise<object>;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Include flattened update data so parent method can read nested update keys */
    protected _render(force?: boolean, context?: SidebarDirectoryRenderOptions): Promise<void>;
}
