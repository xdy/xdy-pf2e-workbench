import { ActorPF2e } from "@actor/base";
import { UserDataPF2e } from "./data";
import { UserSettingsPF2e } from "./player-config";
export declare class UserPF2e extends User<ActorPF2e> {
    prepareData(): void;
    /** Set user settings defaults */
    prepareBaseData(): void;
    get settings(): Readonly<UserSettingsPF2e>;
    /** Alternative to calling `#updateTokenTargets()` with no argument or an empty array */
    clearTargets(): void;
}
export interface UserPF2e extends User<ActorPF2e> {
    readonly data: UserDataPF2e<this>;
}
