/// <reference types="jquery" />
import { ActorPF2e } from "@actor";
import { AttackTarget } from "@actor/creature/types";
import { TraitViewData } from "@actor/data/base";
import { ItemPF2e } from "@item";
import { ChatMessagePF2e } from "@module/chat-message";
import { ZeroToThree } from "@module/data";
import { RollNotePF2e } from "@module/notes";
import { RollSubstitution } from "@module/rules/synthetics";
import { TokenDocumentPF2e } from "@scene";
import { DamageRollContext, DamageTemplate } from "@system/damage";
import { CheckModifier, ModifierPF2e } from "../actor/modifiers";
import { CheckRoll } from "./check/roll";
import { CheckDC, DegreeOfSuccessString, DEGREE_OF_SUCCESS_STRINGS } from "./degree-of-success";
interface RollDataPF2e extends RollData {
    rollerId?: string;
    totalModifier?: number;
    isReroll?: boolean;
    degreeOfSuccess?: ZeroToThree;
    strike?: {
        actor: ActorUUID | TokenDocumentUUID;
        index: number;
        name: string;
    };
}
/** Possible parameters of a RollFunction */
interface RollParameters {
    /** The triggering event */
    event?: JQuery.TriggeredEvent;
    /** Any options which should be used in the roll. */
    options?: string[] | Set<string>;
    /** Optional DC data for the roll */
    dc?: CheckDC | null;
    /** Callback called when the roll occurs. */
    callback?: (roll: Rolled<Roll>) => void;
    /** Additional modifiers */
    modifiers?: ModifierPF2e[];
}
interface StrikeRollParams extends RollParameters {
    /** Retrieve the formula of the strike roll without following through to the end */
    getFormula?: true;
    /** The strike is involve throwing a thrown melee weapon or to use the melee usage of a combination weapon */
    altUsage?: "thrown" | "melee" | null;
    /** Should this roll be rolled twice? If so, should it keep highest or lowest? */
    rollTwice?: RollTwiceOption;
}
declare type RollTwiceOption = "keep-higher" | "keep-lower" | false;
declare type AttackCheck = "attack-roll" | "spell-attack-roll";
declare type CheckType = "check" | "counteract-check" | "initiative" | "skill-check" | "perception-check" | "saving-throw" | "flat-check" | AttackCheck;
interface BaseRollContext {
    /** Any options which should be used in the roll. */
    options?: Set<string>;
    /** Any notes which should be shown for the roll. */
    notes?: RollNotePF2e[];
    /** If true, this is a secret roll which should only be seen by the GM. */
    secret?: boolean;
    /** The roll mode (i.e., 'roll', 'blindroll', etc) to use when rendering this roll. */
    rollMode?: RollMode;
    /** If this is an attack, the target of that attack */
    target?: AttackTarget | null;
    /** Any traits for the check. */
    traits?: TraitViewData[];
    /** The outcome a roll (usually relevant only to rerolls) */
    outcome?: typeof DEGREE_OF_SUCCESS_STRINGS[number] | null;
    /** The outcome prior to being changed by abilities raising or lowering degree of success */
    unadjustedOutcome?: typeof DEGREE_OF_SUCCESS_STRINGS[number] | null;
    /** Should the roll be immediately created as a chat message? */
    createMessage?: boolean;
    /** Skip the roll dialog regardless of user setting  */
    skipDialog?: boolean;
}
interface CheckRollContext extends BaseRollContext {
    /** The type of this roll, like 'perception-check' or 'saving-throw'. */
    type?: CheckType;
    target?: AttackTarget | null;
    /** Should this roll be rolled twice? If so, should it keep highest or lowest? */
    rollTwice?: RollTwiceOption;
    /** The actor which initiated this roll. */
    actor?: ActorPF2e;
    /** The token which initiated this roll. */
    token?: TokenDocumentPF2e;
    /** The originating item of this attack, if any */
    item?: Embedded<ItemPF2e> | null;
    /** Optional title of the roll options dialog; defaults to the check name */
    title?: string;
    /** Optional DC data for the check */
    dc?: CheckDC | null;
    /** The domains this roll had, for reporting purposes */
    domains?: string[];
    /** Is the roll a reroll? */
    isReroll?: boolean;
    /** D20 results substituted for an actual roll */
    substitutions?: RollSubstitution[];
    /** Is the weapon used in this attack roll an alternative usage? */
    altUsage?: "thrown" | "melee" | null;
}
interface CheckTargetFlag {
    actor: ActorUUID | TokenDocumentUUID;
    token?: TokenDocumentUUID;
}
declare type ContextFlagOmission = "actor" | "altUsage" | "createMessage" | "item" | "options" | "target" | "token";
interface CheckRollContextFlag extends Required<Omit<CheckRollContext, ContextFlagOmission>> {
    actor: string | null;
    token: string | null;
    item?: undefined;
    target: CheckTargetFlag | null;
    altUsage?: "thrown" | "melee" | null;
    options: string[];
}
interface RerollOptions {
    heroPoint?: boolean;
    keep?: "new" | "best" | "worst";
}
declare type CheckRollCallback = (roll: Rolled<CheckRoll>, outcome: DegreeOfSuccessString | null | undefined, message: ChatMessagePF2e) => Promise<void> | void;
declare class CheckPF2e {
    /** Roll the given statistic, optionally showing the check modifier dialog if 'Shift' is held down. */
    static roll(check: CheckModifier, context?: CheckRollContext, event?: JQuery.TriggeredEvent | null, callback?: CheckRollCallback): Promise<Rolled<CheckRoll> | null>;
    private static createTagFlavor;
    /** Reroll a rolled check given a chat message. */
    static rerollFromMessage(message: ChatMessagePF2e, { heroPoint, keep }?: RerollOptions): Promise<void>;
    /**
     * Renders the reroll, highlighting the old result if it was a critical success or failure
     * @param roll  The roll that is to be rerendered
     * @param isOld This is the old roll render, so remove damage or other buttons
     */
    static renderReroll(roll: Rolled<Roll>, { isOld }: {
        isOld: boolean;
    }): Promise<string>;
    private static createResultFlavor;
}
declare class DamageRollPF2e {
    static roll(damage: DamageTemplate, context: DamageRollContext, callback?: Function): Promise<void>;
}
export { BaseRollContext, CheckPF2e, CheckRollCallback, CheckRollContext, CheckRollContextFlag, CheckType, DamageRollPF2e, RollDataPF2e, RollParameters, RollTwiceOption, StrikeRollParams, };
