/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/base";
/** Extend ActorDirectory to show more information */
export declare class ActorDirectoryPF2e<TDocument extends ActorPF2e> extends ActorDirectory<TDocument> {
    static get defaultOptions(): SidebarDirectoryOptions;
    getData(): Promise<object>;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Include flattened update data so parent method can read nested update keys */
    protected _render(force?: boolean, context?: SidebarDirectoryRenderOptions): Promise<void>;
}
