import type * as TinyMCE from "tinymce";
declare class JournalSheetPF2e<TJournalEntry extends JournalEntry> extends JournalSheet<TJournalEntry> {
    static get theme(): string | null;
    /** Use the system-themed styling only if the setting is enabled (on by default) */
    static get defaultOptions(): DocumentSheetOptions;
    /** Start pagination at 1 🤫 */
    getData(options?: Partial<DocumentSheetOptions>): Promise<JournalSheetData<TJournalEntry>>;
}
declare class JournalTextTinyMCESheetPF2e<TDocument extends JournalEntryPage<JournalEntry | null>> extends JournalTextTinyMCESheet<TDocument> {
    activateEditor(name: string, options?: Partial<TinyMCE.EditorOptions>, initialContent?: string): Promise<TinyMCE.Editor>;
}
export { JournalSheetPF2e, JournalTextTinyMCESheetPF2e };
