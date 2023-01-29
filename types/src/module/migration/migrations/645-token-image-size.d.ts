import { ActorPF2e } from "@actor";
import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Restore saved token images and sizes from old versions of the respective rule elements */
export declare class Migration645TokenImageSize extends MigrationBase {
    static version: number;
    imageOverrides: Map<string, VideoFilePath>;
    sizeOverrides: Map<string, {
        height: number;
        width: number;
    }>;
    isTokenImageFlag(flag: unknown): flag is VideoFilePath;
    isTokenSizeFlag(flag: unknown): flag is {
        height: number;
        width: number;
    };
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateToken(tokenSource: foundry.data.TokenSource, actor: Readonly<ActorPF2e | null>): Promise<void>;
}
