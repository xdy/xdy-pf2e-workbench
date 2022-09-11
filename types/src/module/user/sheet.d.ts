import { UserPF2e } from "./document";
/** Player-specific settings, stored as flags on each User */
export declare class UserConfigPF2e<TUser extends UserPF2e> extends UserConfig<TUser> {
    get template(): string;
}
