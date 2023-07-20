import { AbstractEffectPF2e } from "@item";
import { ActorPF2e } from "./base.ts";
export declare class TokenEffect implements TemporaryEffect {
    #private;
    tint: HexColorString | null;
    readonly isTemporary = true;
    constructor(effect: AbstractEffectPF2e<ActorPF2e>);
    get id(): string;
    get _id(): string;
    get parent(): ActorPF2e;
    get name(): string;
    get icon(): ImageFilePath;
    get changes(): never[];
    get description(): string;
    get flags(): DocumentFlags;
    get statuses(): Set<string>;
    get disabled(): boolean;
    get duration(): PreparedEffectDurationData;
    get transfer(): boolean;
    get origin(): ItemUUID;
    getFlag(scope: string, flag: string): unknown;
}
