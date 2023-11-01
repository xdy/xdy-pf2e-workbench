declare global {
    interface Global {
        document: Document;
        window: Window;
        navigator: Navigator;
    }
}
interface ExtractArgs {
    packDb: string;
    disablePresort?: boolean;
    logWarnings?: boolean;
}
declare class PackExtractor {
    #private;
    /** The DB file to extract, with a special value of "all" */
    readonly packDB: string;
    /** Whether to emit warnings on some events */
    readonly emitWarnings: boolean;
    readonly dataPath: string;
    readonly tempDataPath: string;
    readonly packsMetadata: CompendiumMetadata[];
    disablePresort: boolean;
    constructor(params: ExtractArgs);
    /** Extract one or all packs */
    run(): Promise<number>;
    extractPack(filePath: string, packDirectory: string): Promise<number>;
}
export { PackExtractor, type ExtractArgs };
