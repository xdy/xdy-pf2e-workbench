import { AbstractEffectPF2e } from "@item";
import { ActorPF2e } from "./base.ts";
export declare class TokenEffect implements TemporaryEffect {
    #private;
    tint: HexColorString | null;
    readonly isTemporary = true;
    constructor(effect: AbstractEffectPF2e<ActorPF2e>);
    get parent(): ActorPF2e;
    get name(): string;
    get icon(): ImageFilePath;
    get description(): string;
    get flags(): DocumentFlags;
    get statuses(): Set<string>;
    get disabled(): boolean;
    get duration(): PreparedEffectDurationData;
    getFlag(scope: string, flag: string): unknown;
}
