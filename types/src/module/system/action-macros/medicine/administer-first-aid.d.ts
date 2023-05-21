import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.ts";
declare const ADMINISTER_FIRST_AID_VARIANTS: readonly ["stabilize", "stop-bleeding"];
type AdministerFirstAidVariant = (typeof ADMINISTER_FIRST_AID_VARIANTS)[number];
declare function administerFirstAid(options: {
    variant: AdministerFirstAidVariant;
} & SkillActionOptions): void;
declare class AdministerFirstAidAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
declare const action: AdministerFirstAidAction;
export { administerFirstAid as legacy, action };
