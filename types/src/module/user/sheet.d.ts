import type { UserPF2e } from "./document.ts";
/** Player-specific settings, stored as flags on each User */
export declare class UserConfigPF2e<TUser extends UserPF2e> extends UserConfig<TUser> {
    getData(options: DocumentSheetOptions): Promise<UserConfigData<TUser>>;
    get template(): string;
}
