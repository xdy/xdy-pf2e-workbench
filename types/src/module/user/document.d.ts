import type { ActorPF2e } from "@actor";
import type { TokenPF2e } from "@module/canvas/index.ts";
import type { ScenePF2e, TokenDocumentPF2e } from "@scene";
import { UserFlagsPF2e, UserSourcePF2e } from "./data.ts";

declare class UserPF2e extends User<ActorPF2e<null>> {
    prepareData(): void;
    /** Set user settings defaults */
    prepareBaseData(): void;
    get settings(): Readonly<UserSettingsPF2e>;
    /** Get tokens controlled by this user or, failing that, a token of the assigned character. */
    getActiveTokens(): TokenDocumentPF2e[];
    /** Alternative to calling `#updateTokenTargets()` with no argument or an empty array */
    clearTargets(): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<null>, userId: string): void;
}
interface UserPF2e extends User<ActorPF2e<null>> {
    targets: UserTargets<TokenPF2e<TokenDocumentPF2e<ScenePF2e>>>;
    flags: UserFlagsPF2e;
    readonly _source: UserSourcePF2e;
}
interface UserSettingsPF2e {
    showEffectPanel: boolean;
    showCheckDialogs: boolean;
    showDamageDialogs: boolean;
    monochromeDarkvision: boolean;
    searchPackContents: boolean;
}
export { UserPF2e, type UserSettingsPF2e };
