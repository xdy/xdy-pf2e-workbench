import { AbstractEffectPF2e, EffectBadge } from "@item/abstract-effect";
import { UserPF2e } from "@module/user";
import { AfflictionData } from "./data";
declare class AfflictionPF2e extends AbstractEffectPF2e {
    get badge(): EffectBadge;
    get stage(): number;
    increase(): Promise<void>;
    decrease(): Promise<void>;
    prepareBaseData(): void;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface AfflictionPF2e {
    readonly data: AfflictionData;
}
export { AfflictionPF2e };
