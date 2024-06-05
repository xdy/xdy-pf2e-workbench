declare class JournalSheetPF2e<TJournalEntry extends JournalEntry> extends JournalSheet<TJournalEntry> {
    /** Start pagination at 1 🤫 */
    getData(options?: Partial<DocumentSheetOptions>): Promise<JournalSheetData<TJournalEntry>>;
    protected _configureProseMirrorPlugins(name: string, options: {
        remove?: boolean;
    }): Record<string, ProseMirror.Plugin>;
}
export { JournalSheetPF2e };
