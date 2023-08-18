import { SingleCheckAction } from "@actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare const ADMINISTER_FIRST_AID_VARIANTS: readonly ["stabilize", "stop-bleeding"];
type AdministerFirstAidVariant = (typeof ADMINISTER_FIRST_AID_VARIANTS)[number];
declare function administerFirstAid(options: {
    variant: AdministerFirstAidVariant;
} & SkillActionOptions): void;
declare class AdministerFirstAidAction extends SingleCheckAction {
    constructor();
}
declare const action: AdministerFirstAidAction;
export { action, administerFirstAid as legacy };
