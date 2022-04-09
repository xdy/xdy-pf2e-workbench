/// <reference types="jquery" />
import type { ActorPF2e } from "@actor/base";
import { CreaturePF2e } from "@actor";
import { ModifierPF2e } from "@actor/modifiers";
import { Statistic, StatisticDataWithDC } from "@system/statistic";
import { RollNotePF2e } from "@module/notes";
import { CheckDC, DegreeOfSuccessString, DEGREE_OF_SUCCESS_STRINGS } from "@system/degree-of-success";
import { seek } from "./basic/seek";
import { senseMotive } from "./basic/sense-motive";
import { balance } from "./acrobatics/balance";
import { maneuverInFlight } from "./acrobatics/maneuver-in-flight";
import { squeeze } from "./acrobatics/squeeze";
import { tumbleThrough } from "./acrobatics/tumble-through";
import { climb } from "./athletics/climb";
import { disarm } from "./athletics/disarm";
import { forceOpen } from "./athletics/force-open";
import { grapple } from "./athletics/grapple";
import { highJump } from "./athletics/high-jump";
import { longJump } from "./athletics/long-jump";
import { shove } from "./athletics/shove";
import { swim } from "./athletics/swim";
import { trip } from "./athletics/trip";
import { whirlingThrow } from "./athletics/whirling-throw";
import { craft } from "./crafting/craft";
import { createADiversion } from "./deception/create-a-diversion";
import { feint } from "./deception/feint";
import { impersonate } from "./deception/impersonate";
import { lie } from "./deception/lie";
import { bonMot } from "./diplomacy/bon-mot";
import { gatherInformation } from "./diplomacy/gather-information";
import { makeAnImpression } from "./diplomacy/make-an-impression";
import { request } from "./diplomacy/request";
import { coerce } from "./intimidation/coerce";
import { demoralize } from "./intimidation/demoralize";
import { hide } from "./stealth/hide";
import { sneak } from "./stealth/sneak";
import { pickALock } from "./thievery/pick-a-lock";
import { WeaponTrait } from "@item/weapon/data";
declare type CheckType = "skill-check" | "perception-check" | "saving-throw" | "attack-roll";
export declare type ActionGlyph = "A" | "D" | "T" | "R" | "F" | "a" | "d" | "t" | "r" | "f" | 1 | 2 | 3 | "1" | "2" | "3";
export interface ActionDefaultOptions {
    event: JQuery.TriggeredEvent;
    actors?: ActorPF2e | ActorPF2e[];
    glyph?: ActionGlyph;
    modifiers?: ModifierPF2e[];
}
export interface SkillActionOptions extends ActionDefaultOptions {
    skill?: string;
    difficultyClass?: CheckDC;
}
export interface CheckResultCallback {
    actor: ActorPF2e;
    message?: ChatMessage;
    outcome: typeof DEGREE_OF_SUCCESS_STRINGS[number] | null | undefined;
    roll: Rolled<Roll>;
}
interface SimpleRollActionCheckOptions {
    actors: ActorPF2e | ActorPF2e[] | undefined;
    statName: string;
    actionGlyph: ActionGlyph | undefined;
    title: string;
    subtitle: string;
    modifiers: ModifierPF2e[] | undefined;
    rollOptions: string[];
    extraOptions: string[];
    traits: string[];
    checkType: CheckType;
    event: JQuery.TriggeredEvent;
    difficultyClass?: CheckDC;
    difficultyClassStatistic?: (creature: CreaturePF2e) => Statistic<StatisticDataWithDC>;
    extraNotes?: (selector: string) => RollNotePF2e[];
    callback?: (result: CheckResultCallback) => void;
    createMessage?: boolean;
    weaponTrait?: WeaponTrait;
    weaponTraitWithPenalty?: WeaponTrait;
}
export declare class ActionMacros {
    static macros: {
        seek: typeof seek;
        senseMotive: typeof senseMotive;
        balance: typeof balance;
        maneuverInFlight: typeof maneuverInFlight;
        squeeze: typeof squeeze;
        tumbleThrough: typeof tumbleThrough;
        climb: typeof climb;
        disarm: typeof disarm;
        forceOpen: typeof forceOpen;
        grapple: typeof grapple;
        highJump: typeof highJump;
        longJump: typeof longJump;
        shove: typeof shove;
        swim: typeof swim;
        trip: typeof trip;
        whirlingThrow: typeof whirlingThrow;
        craft: typeof craft;
        createADiversion: typeof createADiversion;
        feint: typeof feint;
        impersonate: typeof impersonate;
        lie: typeof lie;
        bonMot: typeof bonMot;
        gatherInformation: typeof gatherInformation;
        makeAnImpression: typeof makeAnImpression;
        request: typeof request;
        coerce: typeof coerce;
        demoralize: typeof demoralize;
        hide: typeof hide;
        sneak: typeof sneak;
        pickALock: typeof pickALock;
    };
    static resolveStat(stat: string): {
        checkType: CheckType;
        property: string;
        stat: string;
        subtitle: string;
    };
    static note(selector: string, translationPrefix: string, outcome: DegreeOfSuccessString, translationKey?: string): RollNotePF2e;
    static simpleRollActionCheck(options: SimpleRollActionCheckOptions): Promise<void>;
    private static getWeaponPotencyModifier;
    private static getApplicableEquippedWeapons;
}
export {};
