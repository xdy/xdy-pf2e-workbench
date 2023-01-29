import { ActorPF2e } from "@actor";
import { RollNotePF2e } from "@module/notes";
import { DegreeOfSuccessString } from "@system/degree-of-success";
import { SimpleRollActionCheckOptions } from "./types";
import { CheckType } from "@system/check";
export declare class ActionMacroHelpers {
    static resolveStat(stat: string): {
        checkType: CheckType;
        property: string;
        stat: string;
        subtitle: string;
    };
    static note(selector: string, translationPrefix: string, outcome: DegreeOfSuccessString, translationKey?: string): RollNotePF2e;
    static simpleRollActionCheck(options: SimpleRollActionCheckOptions): Promise<void>;
    static target(): {
        token: import("../../scene/token-document/document").TokenDocumentPF2e<ActorPF2e> | null;
        actor: ActorPF2e | null;
    };
    private static getWeaponPotencyModifier;
    private static getApplicableEquippedWeapons;
}
