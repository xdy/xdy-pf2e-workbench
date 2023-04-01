import { ActorPF2e } from "@actor";
import { AbstractEffectPF2e, EffectBadge } from "@item/abstract-effect";
import { UserPF2e } from "@module/user";
import { AfflictionFlags, AfflictionSource, AfflictionSystemData } from "./data";
declare class AfflictionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    get badge(): EffectBadge;
    get stage(): number;
    increase(): Promise<void>;
    decrease(): Promise<void>;
    prepareBaseData(): void;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
}
interface AfflictionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    flags: AfflictionFlags;
    readonly _source: AfflictionSource;
    system: AfflictionSystemData;
}
export { AfflictionPF2e };
