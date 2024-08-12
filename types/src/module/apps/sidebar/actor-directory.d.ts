/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
/** Extend ActorDirectory to show more information */
declare class ActorDirectoryPF2e extends ActorDirectory<ActorPF2e<null>> {
    #private;
    static entryPartial: string;
    static get defaultOptions(): SidebarDirectoryOptions;
    getData(): Promise<object>;
    saveActivePartyFolderState(): void;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Overriden so matched actors in a party reveal their party "folder" as well */
    protected _onSearchFilter(event: KeyboardEvent, query: string, rgx: RegExp, html: HTMLElement): void;
    protected _onDragStart(event: DragEvent): void;
    /** Overriden to prevent highlighting of certain types of draggeed data (such as parties) */
    protected _onDragHighlight(event: DragEvent): void;
    protected _handleDroppedEntry(target: HTMLElement, data: ActorSidebarDropData): Promise<void>;
    /** Inject parties without having to alter a core template */
    protected _renderInner(data: object): Promise<JQuery>;
    protected _contextMenu($html: JQuery<HTMLElement>): void;
    protected _getEntryContextOptions(): EntryContextOption[];
    protected _getPartyContextOptions(): EntryContextOption[];
}
interface ActorSidebarDropData extends DropCanvasData<"actor", ActorPF2e> {
    fromParty?: string;
}
export { ActorDirectoryPF2e };
