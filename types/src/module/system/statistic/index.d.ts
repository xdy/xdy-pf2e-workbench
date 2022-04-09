import { ModifierPF2e, StatisticModifier } from "@actor/modifiers";
import { CheckType } from "@system/rolls";
import { ActorPF2e } from "@actor";
import { BaseStatisticData, StatisticChatData, StatisticCompatData, StatisticData, StatisticDataWithCheck, StatisticDataWithDC } from "./data";
import { ItemPF2e } from "@item";
import { CheckDC } from "@system/degree-of-success";
import { CheckRoll } from "@system/check/roll";
export * from "./data";
export interface StatisticRollParameters {
    /** Which attack this is (for the purposes of multiple attack penalty) */
    attackNumber?: number;
    /** Optional target for the roll */
    target?: ActorPF2e | null;
    /** Optional DC data for the roll */
    dc?: CheckDC | null;
    /** Any additional options which should be used in the roll. */
    extraRollOptions?: string[];
    /** Additional modifiers */
    modifiers?: ModifierPF2e[];
    /** The originating item of this attack, if any */
    item?: Embedded<ItemPF2e> | null;
    /** Is this a secret roll? */
    secret?: boolean;
    /** Should the dialog be skipped */
    skipDialog?: boolean;
    /** Callback called when the roll occurs. */
    callback?: (roll: Rolled<Roll>) => void;
}
interface RollOptionParameters {
    extraRollOptions?: string[];
    item?: ItemPF2e | null;
    target?: ActorPF2e | null;
}
declare type CheckValue<T extends BaseStatisticData> = T["check"] extends object ? StatisticCheck : null;
declare type DCValue<T extends BaseStatisticData> = T["dc"] extends object ? StatisticDifficultyClass : null;
/** Object used to perform checks or get dcs, or both. These are created from StatisticData which drives its behavior. */
export declare class Statistic<T extends BaseStatisticData = StatisticData> {
    actor: ActorPF2e;
    readonly data: T;
    options?: RollOptionParameters | undefined;
    abilityModifier?: ModifierPF2e;
    modifiers: ModifierPF2e[];
    get slug(): string;
    constructor(actor: ActorPF2e, data: T, options?: RollOptionParameters | undefined);
    /** Compatibility function which creates a statistic from a StatisticModifier instead of from StatisticData. */
    static from(actor: ActorPF2e, stat: StatisticModifier, slug: string, label: string, type: CheckType, domains?: string[]): Statistic<{
        slug: string;
        domains: string[] | undefined;
        check: {
            adjustments: import("@system/degree-of-success").DegreeOfSuccessAdjustment[] | undefined;
            label: string;
            type: CheckType;
        };
        dc: {};
        modifiers: ModifierPF2e[];
        notes: import("../../notes").RollNotePF2e[] | undefined;
    }>;
    createRollOptions(domains: string[], args?: RollOptionParameters): string[];
    withRollOptions(options?: RollOptionParameters): Statistic<T>;
    /** Creates and returns an object that can be used to perform a check if this statistic has check data. */
    get check(): CheckValue<T>;
    /** Calculates the DC (with optional roll options) and returns it, if this statistic has DC data. */
    get dc(): DCValue<T>;
    /** Creates view data for sheets and chat messages */
    getChatData(options?: RollOptionParameters): StatisticChatData<T>;
    /** Chat output data for checks only that is compatible with the older sheet styles. */
    getCompatData(this: Statistic<StatisticDataWithCheck>, options?: RollOptionParameters): StatisticCompatData;
}
declare class StatisticCheck {
    #private;
    private parent;
    domains: string[];
    mod: number;
    modifiers: ModifierPF2e[];
    label: string;
    constructor(parent: Statistic<StatisticDataWithCheck>, options?: RollOptionParameters);
    createRollOptions(args?: RollOptionParameters): string[];
    calculateMap(options: {
        item: ItemPF2e;
    }): {
        label: string;
        penalty: number;
    };
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    get breakdown(): string;
}
declare class StatisticDifficultyClass {
    private parent;
    domains: string[];
    value: number;
    modifiers: ModifierPF2e[];
    constructor(parent: Statistic<StatisticDataWithDC>, options?: RollOptionParameters);
    createRollOptions(args?: RollOptionParameters): string[];
    get breakdown(): string;
}
