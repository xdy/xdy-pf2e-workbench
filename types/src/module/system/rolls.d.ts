/// <reference types="jquery" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { CheckModifier, ModifierPF2e } from "../actor/modifiers";
import { CheckDC, DEGREE_OF_SUCCESS_STRINGS } from "./degree-of-success";
import { DamageRollContext, DamageTemplate } from "@system/damage";
import { RollNotePF2e } from "@module/notes";
import { ChatMessagePF2e } from "@module/chat-message";
import { ZeroToThree } from "@module/data";
import { TokenDocumentPF2e } from "@scene";
import { StrikeTrait } from "@actor/data/base";
import { AttackTarget } from "@actor/creature/types";
import { CheckRoll } from "./check/roll";
export interface RollDataPF2e extends RollData {
    totalModifier?: number;
    degreeOfSuccess?: ZeroToThree;
    strike?: {
        actor: ActorUUID | TokenDocumentUUID;
        index: number;
        name: string;
    };
}
/** Possible parameters of a RollFunction */
export interface RollParameters {
    /** The triggering event */
    event?: JQuery.TriggeredEvent;
    /** Any options which should be used in the roll. */
    options?: string[];
    /** Optional DC data for the roll */
    dc?: CheckDC | null;
    /** Callback called when the roll occurs. */
    callback?: (roll: Rolled<Roll>) => void;
    /** Additional modifiers */
    modifiers?: ModifierPF2e[];
}
export interface StrikeRollParams extends RollParameters {
    /** Retrieve the formula of the strike roll without following through to the end */
    getFormula?: true;
    /** The strike is to use the melee usage of a combination weapon */
    meleeUsage?: boolean;
    /** Should this roll be rolled twice? If so, should it keep highest or lowest? */
    rollTwice?: RollTwiceOption;
}
export declare type RollTwiceOption = "no" | "keep-higher" | "keep-lower";
export declare type AttackCheck = "attack-roll" | "spell-attack-roll";
export declare type CheckType = "check" | "counteract-check" | "initiative" | "skill-check" | "perception-check" | "saving-throw" | "flat-check" | AttackCheck;
export interface BaseRollContext {
    /** Any options which should be used in the roll. */
    options?: string[];
    /** Any notes which should be shown for the roll. */
    notes?: RollNotePF2e[];
    /** If true, this is a secret roll which should only be seen by the GM. */
    secret?: boolean;
    /** The roll mode (i.e., 'roll', 'blindroll', etc) to use when rendering this roll. */
    rollMode?: RollMode;
    /** If this is an attack, the target of that attack */
    target?: AttackTarget | null;
    /** Any traits for the check. */
    traits?: StrikeTrait[];
    /** The outcome a roll (usually relevant only to rerolls) */
    outcome?: typeof DEGREE_OF_SUCCESS_STRINGS[number] | null;
    /** The outcome prior to being changed by abilities raising or lowering degree of success */
    unadjustedOutcome?: typeof DEGREE_OF_SUCCESS_STRINGS[number] | null;
    /** Should the roll be immediately created as a chat message? */
    createMessage?: boolean;
    /** Skip the roll dialog regardless of user setting  */
    skipDialog?: boolean;
}
export interface CheckRollContext extends BaseRollContext {
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
    /** Is the roll a reroll? */
    isReroll?: boolean;
}
interface CheckTargetFlag {
    actor: ActorUUID | TokenDocumentUUID;
    token?: TokenDocumentUUID;
}
declare type ContextFlagOmissions = "actor" | "token" | "item" | "target" | "createMessage";
export interface CheckRollContextFlag extends Required<Omit<CheckRollContext, ContextFlagOmissions>> {
    actor: string | null;
    token: string | null;
    item?: undefined;
    target: CheckTargetFlag | null;
}
interface RerollOptions {
    heroPoint?: boolean;
    keep?: "new" | "best" | "worst";
}
export declare class CheckPF2e {
    /**
     * Roll the given statistic, optionally showing the check modifier dialog if 'Shift' is held down.
     */
    static roll(check: CheckModifier, context?: CheckRollContext, event?: JQuery.TriggeredEvent | null, callback?: (roll: Rolled<Roll>, outcome: typeof DEGREE_OF_SUCCESS_STRINGS[number] | null | undefined, message: ChatMessagePF2e) => Promise<void> | void): Promise<Rolled<CheckRoll> | null>;
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
    private static createFlavorMarkup;
}
/**
 * @category PF2
 */
export declare class DamageRollPF2e {
    static roll(damage: DamageTemplate, context: DamageRollContext, callback?: Function): Promise<void>;
}
export {};
