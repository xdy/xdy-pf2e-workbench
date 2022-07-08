/**
 * Pull actor and token art from module.json files, which will replace default images on compendium actors and their
 * prototype tokens
 */
declare function registerModuleArt(): Promise<void>;
interface ModuleArt {
    actor: ImagePath;
    token: ImagePath | {
        img: ImagePath;
        scale?: number;
    };
}
export { registerModuleArt, ModuleArt };
