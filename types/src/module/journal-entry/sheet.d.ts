import type * as TinyMCE from "tinymce";
declare class JournalSheetPF2e<TJournalEntry extends JournalEntry = JournalEntry> extends JournalSheet<TJournalEntry> {
    static get theme(): string | null;
    /** Use the system-themed styling only if the setting is enabled (on by default) */
    static get defaultOptions(): DocumentSheetOptions;
}
declare class JournalTextTinyMCESheetPF2e extends JournalTextTinyMCESheet {
    activateEditor(name: string, options?: Partial<TinyMCE.EditorOptions>, initialContent?: string): Promise<TinyMCE.Editor>;
}
export { JournalSheetPF2e, JournalTextTinyMCESheetPF2e };
