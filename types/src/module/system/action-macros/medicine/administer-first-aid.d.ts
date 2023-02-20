import { SkillActionOptions } from "..";
declare const ADMINISTER_FIRST_AID_VARIANTS: {
    readonly stabilize: {
        readonly notes: {
            readonly criticalFailure: "PF2E.Actions.AdministerFirstAid.Stabilize.Notes.criticalFailure";
            readonly success: "PF2E.Actions.AdministerFirstAid.Stabilize.Notes.success";
        };
        readonly rollOption: "action:administer-first-aid:stabilize";
        readonly title: "PF2E.Actions.AdministerFirstAid.Stabilize.Title";
    };
    readonly stopBleeding: {
        readonly notes: {
            readonly criticalFailure: "PF2E.Actions.AdministerFirstAid.StopBleeding.Notes.criticalFailure";
            readonly success: "PF2E.Actions.AdministerFirstAid.StopBleeding.Notes.success";
        };
        readonly rollOption: "action:administer-first-aid:stop-bleeding";
        readonly title: "PF2E.Actions.AdministerFirstAid.StopBleeding.Title";
    };
};
type AdministerFirstAidVariant = keyof typeof ADMINISTER_FIRST_AID_VARIANTS;
export declare function administerFirstAid(options: {
    variant: AdministerFirstAidVariant;
} & SkillActionOptions): void;
export {};
