/// <reference types="jquery" />
/// <reference types="tooltipster" />
import "../../styles/tinymce.scss";
import type * as TinyMCE from "tinymce";

export declare class JournalSheetPF2e<TJournalEntry extends JournalEntry = JournalEntry> extends JournalSheet<TJournalEntry> {
    get template(): string;
    activateListeners($html: JQuery): void;
    activateEditor(name: string, options?: Partial<TinyMCE.EditorSettings>, initialContent?: string): void;
}
export declare class JournalSheetStyledPF2e extends JournalSheetPF2e {
    /** Use the system-themed styling only if the setting is enabled (on by default) */
    static get defaultOptions(): DocumentSheetOptions;
}
