import { ActorPF2e } from "@actor";
import { TraitViewData } from "@actor/data/base";
import { ModifierPF2e, StatisticModifier } from "@actor/modifiers";
import { AbilityString } from "@actor/types";
import { ItemPF2e } from "@item";
import { ZeroToFour } from "@module/data";
import { CheckRoll, CheckRollCallback, CheckType, RollTwiceOption } from "@system/check";
import { CheckDC } from "@system/degree-of-success";
import { StatisticChatData, StatisticTraceData, StatisticData, StatisticCheckData } from "./data";
export * from "./data";
export interface StatisticRollParameters {
    /** Which attack this is (for the purposes of multiple attack penalty) */
    attackNumber?: number;
    /** Optional target for the roll */
    target?: ActorPF2e | null;
    /** Optional origin for the roll: only one of target and origin may be provided */
    origin?: ActorPF2e | null;
    /** Optional DC data for the roll */
    dc?: CheckDC | null;
    /** Any additional options which should be used in the roll. */
    extraRollOptions?: string[];
    /** Additional modifiers */
    modifiers?: ModifierPF2e[];
    /** The originating item of this attack, if any */
    item?: Embedded<ItemPF2e> | null;
    /** The roll mode (i.e., 'roll', 'blindroll', etc) to use when rendering this roll. */
    rollMode?: RollMode;
    /** Should the dialog be skipped */
    skipDialog?: boolean;
    /** Should this roll be rolled twice? If so, should it keep highest or lowest? */
    rollTwice?: RollTwiceOption;
    /** Any traits for the check */
    traits?: (TraitViewData | string)[];
    /** Whether to create a chat message using the roll (defaults true) */
    createMessage?: boolean;
    /** Callback called when the roll occurs. */
    callback?: CheckRollCallback;
}
interface RollOptionParameters {
    extraRollOptions?: string[];
    item?: ItemPF2e | null;
    origin?: ActorPF2e | null;
    target?: ActorPF2e | null;
}
/** Object used to perform checks or get dcs, or both. These are created from StatisticData which drives its behavior. */
export declare class Statistic {
    #private;
    actor: ActorPF2e;
    options?: RollOptionParameters | undefined;
    ability: AbilityString | null;
    abilityModifier: ModifierPF2e | null;
    rank: ZeroToFour | null;
    proficient: boolean;
    modifiers: ModifierPF2e[];
    slug: string;
    label: string;
    /** If this is a skill, returns whether it is a lore skill or not */
    lore?: boolean;
    check: StatisticCheck;
    dc: StatisticDifficultyClass;
    constructor(actor: ActorPF2e, data: StatisticData, options?: RollOptionParameters | undefined);
    /** Compatibility function which creates a statistic from a StatisticModifier instead of from StatisticData. */
    static from(actor: ActorPF2e, stat: StatisticModifier, slug: string, label: string, type: CheckType, domains?: string[]): Statistic;
    createRollOptions(domains: string[], args?: RollOptionParameters): Set<string>;
    withRollOptions(options?: RollOptionParameters): Statistic;
    /**
     * Extend this statistic into a new cloned statistic with additional data.
     * Combines all domains and modifier lists.
     */
    extend(data: Omit<DeepPartial<StatisticData>, "check"> & {
        slug: string;
    } & {
        check?: Partial<StatisticCheckData>;
    }): Statistic;
    /** Shortcut to `this#check#roll` */
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    /** Creates view data for sheets and chat messages */
    getChatData(options?: RollOptionParameters): StatisticChatData;
    /** Returns data intended to be merged back into actor data */
    getTraceData(this: Statistic, options?: {
        value?: "dc" | "mod";
    }): StatisticTraceData;
}
declare class StatisticCheck {
    #private;
    private parent;
    type: CheckType;
    label: string;
    domains: string[];
    mod: number;
    modifiers: ModifierPF2e[];
    constructor(parent: Statistic, data: StatisticData, options?: RollOptionParameters);
    createRollOptions(args?: RollOptionParameters): Set<string>;
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    get breakdown(): string;
}
declare class StatisticDifficultyClass {
    domains: string[];
    value: number;
    modifiers: ModifierPF2e[];
    options: Set<string>;
    constructor(parent: Statistic, data: StatisticData, options?: RollOptionParameters);
    get breakdown(): string;
}
