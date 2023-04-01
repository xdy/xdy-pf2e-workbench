import { ActorPF2e } from "@actor/base";
import { UserFlagsPF2e, UserSourcePF2e } from "./data";
import { TokenPF2e } from "@module/canvas";
import { ScenePF2e, TokenDocumentPF2e } from "@scene";
declare class UserPF2e extends User {
    prepareData(): void;
    /** Set user settings defaults */
    prepareBaseData(): void;
    get settings(): Readonly<UserSettingsPF2e>;
    /** Alternative to calling `#updateTokenTargets()` with no argument or an empty array */
    clearTargets(): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<null>, userId: string): void;
}
interface UserPF2e extends User {
    targets: Set<TokenPF2e<TokenDocumentPF2e<ScenePF2e>>>;
    character: ActorPF2e<null> | null;
    flags: UserFlagsPF2e;
    readonly _source: UserSourcePF2e;
}
interface UserSettingsPF2e {
    showEffectPanel: boolean;
    showRollDialogs: boolean;
    monochromeDarkvision: boolean;
    searchPackContents: boolean;
}
export { UserPF2e, UserSettingsPF2e };
