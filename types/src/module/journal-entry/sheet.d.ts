/// <reference types="jquery" />
/// <reference types="tooltipster" />
import type * as TinyMCE from "tinymce";
import "../../styles/tinymce.scss";
declare class JournalSheetPF2e<TJournalEntry extends JournalEntry = JournalEntry> extends JournalSheet<TJournalEntry> {
    static get theme(): string | null;
    /** Use the system-themed styling only if the setting is enabled (on by default) */
    static get defaultOptions(): DocumentSheetOptions;
    activateListeners($html: JQuery): void;
}
declare class JournalSheetStyledPF2e extends JournalSheetPF2e {
    static get theme(): string;
}
declare class JournalTextPageSheetPF2e extends JournalTextPageSheet {
    activateEditor(name: string, options?: Partial<TinyMCE.EditorOptions>, initialContent?: string): Promise<TinyMCE.Editor>;
}
export { JournalSheetPF2e, JournalSheetStyledPF2e, JournalTextPageSheetPF2e };
