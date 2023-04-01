/** A mapping of module-provided art to be used for compendium actors and their prototype tokens */
declare class ModuleArt {
    #private;
    readonly map: Map<CompendiumUUID, ActorArtPartial>;
    /** Pull actor and token art from module.json or separate mapping files and store in the map */
    refresh(): Promise<void>;
}
/** Prepared `ModuleArtData`, restructured to merge directly into actor source */
interface ActorArtPartial {
    img: ImageFilePath;
    prototypeToken: {
        flags?: {
            pf2e: {
                autoscale: false;
            };
        };
        randomImg?: boolean;
        texture: {
            src: ImageFilePath | VideoFilePath;
            scaleX?: number;
            scaleY?: number;
        };
    };
}
export { ModuleArt };
