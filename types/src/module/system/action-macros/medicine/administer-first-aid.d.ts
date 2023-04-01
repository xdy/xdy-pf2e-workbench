import { SkillActionOptions } from "..";
declare const ADMINISTER_FIRST_AID_VARIANTS: readonly ["stabilize", "stop-bleeding"];
type AdministerFirstAidVariant = (typeof ADMINISTER_FIRST_AID_VARIANTS)[number];
export declare function administerFirstAid(options: {
    variant: AdministerFirstAidVariant;
} & SkillActionOptions): void;
export {};
