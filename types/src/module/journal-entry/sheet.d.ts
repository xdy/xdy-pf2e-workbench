/// <reference types="jquery" />
/// <reference types="tooltipster" />
import type * as TinyMCE from "tinymce";
import "../../styles/tinymce.scss";
declare class JournalSheetPF2e<TJournalEntry extends JournalEntry = JournalEntry> extends JournalSheet<TJournalEntry> {
    activateListeners($html: JQuery): void;
    activateEditor(name: string, options?: Partial<TinyMCE.EditorOptions>, initialContent?: string): void;
}
declare class JournalSheetStyledPF2e extends JournalSheetPF2e {
    /** Use the system-themed styling only if the setting is enabled (on by default) */
    static get defaultOptions(): DocumentSheetOptions;
}
export { JournalSheetPF2e, JournalSheetStyledPF2e };
