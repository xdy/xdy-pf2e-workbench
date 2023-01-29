import { ActorPF2e } from "@actor/base";
import { UserFlagsPF2e } from "./data";
declare class UserPF2e extends User<ActorPF2e> {
    prepareData(): void;
    /** Set user settings defaults */
    prepareBaseData(): void;
    get settings(): Readonly<UserSettingsPF2e>;
    /** Alternative to calling `#updateTokenTargets()` with no argument or an empty array */
    clearTargets(): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext, userId: string): void;
}
interface UserPF2e extends User<ActorPF2e> {
    flags: UserFlagsPF2e;
}
interface UserSettingsPF2e {
    showEffectPanel: boolean;
    showRollDialogs: boolean;
    monochromeDarkvision: boolean;
    searchPackContents: boolean;
}
export { UserPF2e, UserSettingsPF2e };
