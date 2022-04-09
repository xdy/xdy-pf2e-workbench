import { UserPF2e } from "@module/user";
import { ItemPF2e } from "../base";
import { EffectData } from "./data";
export declare class EffectPF2e extends ItemPF2e {
    static get schema(): typeof EffectData;
    static DURATION_UNITS: Readonly<Record<string, number>>;
    get level(): number;
    get isExpired(): boolean;
    get totalDuration(): number;
    get remainingDuration(): {
        expired: boolean;
        remaining: number;
    };
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /** Set a self roll option for this effect */
    prepareActorData(this: Embedded<EffectPF2e>): void;
    /** Include a trimmed version of the "slug" roll option (e.g., effect:rage instead of effect:effect-rage) */
    getRollOptions(prefix?: string): string[];
    /** Set the start time and initiative roll of a newly created effect */
    protected _preCreate(data: PreDocumentId<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    /** Show floaty text when this effect is created on an actor */
    protected _onCreate(data: this["data"]["_source"], options: DocumentModificationContext<this>, userId: string): void;
    /** Show floaty text when this effect is deleted from an actor */
    protected _onDelete(options: DocumentModificationContext, userId: string): void;
}
export interface EffectPF2e {
    readonly data: EffectData;
}
