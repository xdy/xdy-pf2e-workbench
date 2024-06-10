declare class JournalSheetPF2e<TJournalEntry extends JournalEntry> extends JournalSheet<TJournalEntry> {
    /** Start pagination at 1 🤫 */
    getData(options?: Partial<DocumentSheetOptions>): Promise<JournalSheetData<TJournalEntry>>;
}
export { JournalSheetPF2e };
