/** A mapping of module-provided art to be used for compendium actors and their prototype tokens */
declare class ModuleArt {
    #private;
    readonly map: Map<CompendiumUUID, ModuleArtData>;
    /** Pull actor and token art from module.json or separate mapping files and store in the map */
    refresh(): Promise<void>;
}
interface ModuleArtData {
    actor: ImageFilePath;
    token: ImageFilePath | {
        img: ImageFilePath;
        scale?: number;
    };
}
export { ModuleArt };
